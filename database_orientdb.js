var OrientDB = require('orientjs');

var server = OrientDB({
    localhost: 'localhost',
    port: '2424',
    username: 'root',
    password: 'eoqkr1031'
});

var db = server.use('o2');

db.record.get('#21:0')
.then(function (record) {

    console.log('Loaded recode:', record);

});