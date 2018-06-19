var OrientDB = require('orinetjs');

var server = OrientDB({
    localhost: 'localhost',
    port: '2424',
    username: 'root',
    password: 'eoqkr'
});

var db = server.use('o2');

db.record.get('#26:0')
.then(function (record) {

    console.log('Loaded recode:', record);

});