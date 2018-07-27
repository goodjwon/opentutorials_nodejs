var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asdf0813',
  database : 'o2'
});

conn.connect();


app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views', './views_mysql');
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

    var sql = 'SELECT id, title FROM topic';

    conn.query(sql, function(err, topics, fields){
        res.render('view', {topics: topics});
    })
});


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
