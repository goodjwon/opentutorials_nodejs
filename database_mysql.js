

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asdf0813',
  database : 'o2'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


var sql = 'INSERT INTO TOPIC (title, description, author) VALUES (?,?,?)'
var params = ['Supervisor', 'Watcher', 'jwon'];

connection.query(sql, params, function (error, results, fields){
    if(error){
        console.log(error);
    }else{
        console.log(results.insertId);
        //console.log(fields);
    }
});








connection.end();

