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

app.get('/topic/add', function (req, res) {

    var sql = 'SELECT FROM topic';
    db.query(sql).then(function(topics){
        if (topics.lenght === 0) {
            console.log('There is no topic recode');
            res.status(500).send('Internal Server Error');
        }
        res.render('add', { topics: topics });
    });

});


app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT FROM topic';
    db.query(sql).then(function(topics){
        
        var id = req.params.id;
        if(id){
            var sql = 'SELECT FROM topic WHERE @rid=:rid';
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('view', {topics:topics, topic:topic[0]});
            });
        }else{
            res.render('view', {topics:topics});
        }
    });    
} );


app.post('/topic/add', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;        
    
    var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)';

    db.query(sql, {
        params:{
            title:title,
            desc:description,
            author:author
        }
    }).then(function(results){
        res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
    })    
});


app.listen(3000, function () {
    console.log('Conneted, 3000 port');
});
