var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;  // process is a Heroku thing.
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());  // So, now any time a json request (ie POST) comes in, 
                            // express will parse it and we can access it
                            // via request.body

app.get('/', function (req, res) {
	res.send('Todo API Root');
});


// GET all the todos ------
// GET /todos
app.get('/todos', function (req, res) {
  //instead of using JSON.stringify and .parse, use:
	res.json(todos); // Pass obj you want converted to jason and sent back to caller.
});

// GET individual todo ----
// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo); // Handy shortcut way to send a response with Express
	} else {
		res.status(404).send(); // Regular way to send a response with Express
	}
});

// POST  Post means we can send and the server can take data.
// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body,'completed','description');
  
  // Check for bad or missing data
  if ( !_.isBoolean(body.completed)  || 
       !_.isString(body.description) || 
       body.description.trim().length === 0 )
     {
    return res.status(400).send('bad POST body');
  }
  
  body.description = body.description.trim();
  
  body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  if (matchedTodo) {
    todos = _.without(todos, matchedTodo);
    return res.status(200).send(matchedTodo);
  } else {
    return res.status(400).send('Nothing to delete')
  }
})


// LET'S LISTEN.....
app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
