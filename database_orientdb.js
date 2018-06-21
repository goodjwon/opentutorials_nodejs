var OrientDB = require('orientjs');

var server = OrientDB({
    localhost: 'localhost',
    port: '2424',
    username: 'root',
    password: 'eoqkr1031'
});

var db = server.use('o2');
/**
db.record.get('#21:0')
.then(function (record) {
    console.log('Loaded recode:', record);
});

let sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
    console.log(results);
});


var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
        params: {
            rid: '#21:0'
        }
    };

db.query(sql, param).then(function(results){
    console.log(results);
});
 */


var sql = 'INSERT INTO topic (title, descript) VALUES (:title, :descript)';
var param = {
    params: {
        title: 'express',
        descript:'Express is framework for web'
    }
};

db.query(sql, param).then(function(results){console.log(results)});


