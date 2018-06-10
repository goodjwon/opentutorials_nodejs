var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.locals.pretty = true;
app.set('view engine','jade');
app.set('views', 'views');

app.use(express.static('public'));
app.get('/template', function(req, res){
    res.render('temp', {time:Date(), theTitle:'HelloJade'});
});

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/form', function(req, res){
    res.render('form')

});

app.post('/form_receiver', function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    res.send(title+','+description);
});



app.get('/topic/:id', function(req, res){

    var topics = ['nodejs is...','javascript is...', 'express is...'];
    var output = `
    <ul>
        <li><a href=/topic/0>nodejs</a></li>
        <li><a href=/topic/1>javascript</a></li>
        <li><a href=/topic/2>express</a></li>
    </ul>
    ${topics[req.params.id]};
    `

    res.send(output);
});


app.get('/topic/:id/:message', function(req, res){
    res.send(req.params.id + ',' + req.params.message);
});


app.get('/', function(req, res){
    res.send('Hello home page');;
});

app.get('/dynamic', function(req, res){
    var lis = '';
    var time = Date();
    for(var i=0; i < 5; i++){
        lis = lis + '<li>coding</li>';
    };

    var body = `<html>
                    <header>
                        <meta>
                        <title></title>
                    </header>
                    <body>
                        Hello Dynamic!!
                        <ul>
                        ${lis}
                        </ul>
                        ${time}
                    </body>
                </html>`;
    res.send(body);
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/61986.jpg">');
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
