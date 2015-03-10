var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 6900));

app.use(express.static(__dirname + '/main'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/', function(request, response) {
  // turn posted data into JSON and send on to Firebase
  console.log(request);
  response.send('Hello there!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});