var express = require('express');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('test', {title: 'Hello', message: 'World!'});
})

app.listen(6900);