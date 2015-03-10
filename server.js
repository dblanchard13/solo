var express = require('express');
var env = require('./env.json')
var app = express();

// var port = eval(env[process.env.NODE_ENV]['PORT']);

app.set('port', (process.env.PORT || 6900));
// app.set('port', eval(env[process.env.NODE_ENV]['PORT']));

app.use(express.static(__dirname + '/main'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/', function(request, response) {
  response.send('Hello there!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});