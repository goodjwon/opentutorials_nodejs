var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');


var OrientDB = require('orientjs');

var server = OrientDB({
    localhost: 'localhost',
    port: '2424',
    username: 'root',
    password: 'eoqkr'
});

var db = server.use('o2');


app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views', './views_orientdb');
app.set('view engine', 'jade');

app.get('/topic/new', function (req, res) {

    fs.readdir('data', function (err, files) {

        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics: files });
    });

});


app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT FROM topic';
    db.query(sql).then(function(results){
        res.render('view',{topics:results});
    });

    
} );


app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, function (err) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
});



app.listen(3000, function () {
    console.log('Conneted, 3000 port');
});
