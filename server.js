var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000  // process is a Heroku thing.

app.get('/', function(req, res) {
  res.send('Todo-Api Root');
});

app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT + '!');
})