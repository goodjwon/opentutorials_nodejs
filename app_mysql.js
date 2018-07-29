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

/**
 * 입력폼 열기 작업
 */
app.get('/topic/add', function (req, res) {

    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        res.render('add', {topics: topics});
    });
});

/**
 * 입력값 저장 작업
 */
app.post('/topic/add', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO TOPIC (title, description, author) VALUES (?,?,?)'
    var params = [title, description, author];

    conn.query(sql, params, function (error, results, fields){
        if(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }else{
            console.log(results);
            res.redirect('/topic/'+results.insertId);
        }
    });
});

/**
 * 글 목록 및 상세 보기
 */
app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic where id = ?';
            conn.query(sql, [id] ,function(err, topic, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Errors');
                }else{
                    res.render('view', {topics: topics, topic:topic[0]});
                }
            });
        }else{
            res.render('view', {topics: topics});
        } 
    })
});



/**
 * 글 목록 및 수정하기 폼 호출.
 */
app.get(['/topic/:id/edit'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic where id = ?';
            conn.query(sql, [id] ,function(err, topic, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Errors');
                }else{
                    res.render('edit', {topics: topics, topic:topic[0]});
                }
            });
        }else{
            console.log('there is no id');
            res.status(500).send('Internal Server Errors');
        } 
    })
});


/**
 * 글 목록 수정내용 영속화 히기
 */
app.post(['/topic/:id/edit'], function (req, res) {
    var id = req.params.id;
    if(id){
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;

        var sql = 'UPDATE topic SET  title=?, description=?, author=? WHERE id = ?';
        var params = [title, description, author, id];

        conn.query(sql, params, function (error, results, fields){
            if(error){
                console.log(error);
                res.status(500).send('Internal Server Error');
            }else{
                console.log(results);
                res.redirect('/topic/'+id);
            }
        });
    }else{
        console.log('there is no id');
        res.status(500).send('Internal Server Errors');
    } 
});


/**
 * 글 삭제
 */
app.get(['/topic/:id/delete'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id = ?'
            var params = [id];
            conn.query(sql, params, function(err, topic){
                if(err){
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                }else{
                    if(topic===0){
                        console.log('no topic');
                        res.status(500).send('Internal Server Error');
                    }else{
                        res.render('delete', {topics: topics, topic: topic[0]});
                    }
                }
            });
        }else{
            console.log('there is no id');
            res.status(500).send('Internal Server Errors');
        } 
    })
});

/**
 * 글 목록 수정내용 영속화 히기
 */
app.post(['/topic/:id/delete'], function (req, res) {
    var id = req.params.id;
    if(id){
        var sql = 'DELETE FROM topic WHERE id = ?';
        var params = [id];

        conn.query(sql, params, function (error, results, fields){
            if(error){
                console.log(error);
                res.status(500).send('Internal Server Error');
            }else{
                console.log(results);
                res.redirect('/topic/');
            }
        });
    }else{
        console.log('there is no id');
        res.status(500).send('Internal Server Errors');
    } 
});


/**
 * 서버 오픈
 */
app.listen(3000, function () {
    console.log('Conneted, 3000 port');
});
