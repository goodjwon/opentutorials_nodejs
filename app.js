var express = require('express');
var app = express();


//router
app.get('/', function(req, res){
    res.send('Hello home page');
});

app.get('/login', (req, res)=>{
    res.send('Login plase')
})

app.listen(3000, function(){
    console.log('Connected 3000 port');
});

