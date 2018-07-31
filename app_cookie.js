var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var app = express();
app.use(cookieParser());

app.get('/count', function(req, res){
    
    if(req.cookies.count){
        var count = parseInt(req.cookies.count);
    }else{
        var count = 0;
    }
    res.cookie('count', count+1);
    res.send('count : '+ req.cookies.count);
})

/**
 * http://localhost:3000/count
 */
app.listen(3000, function () {
    console.log('Conneted, 3000 port');
});
