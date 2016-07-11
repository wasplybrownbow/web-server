var express = require('express');
var bodyParser = require('body-parser');

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
	var todoId = parseInt(req.params.id, 10);// request parameters always need to be a string. 
                                           // So if you know a number is being passed,
                                           // you have to convert it to a number if you want
                                           // to use it as a number like we are going to do here.  
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo); // Handy shortcut way to send a response with Express
	} else {
		res.status(404).send(); // Regular way to send a response with Express
	}
});

// POST  Post means we can send and the server can take data.
// POST /todos
app.post('/todos', function (req, res) {
	var body = req.body;
	// add id field
	body.id = todoNextId++;

	// push body into array
	todos.push(body);
	
	res.json(body);
});


// LET'S LISTEN.....
app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
