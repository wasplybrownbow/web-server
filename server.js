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
// GET /todos/?completed=true
app.get('/todos', function (req, res) {
  var queryParams = req.query;  // stores the url parameters.
  var filteredTodos = todos;
  
  if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
    filteredTodos = _.where(filteredTodos, {completed: true});
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
    filteredTodos = _.where(filteredTodos, {completed: false});
  }
    
  
  // use _.where which is same as _.findWhere but returns all matches.
  //filteredTodos = _.where(filteredTodos, queryParams)
  
	//res.json(queryParams)  //(filteredTodos); // Pass obj you want converted to jason and sent back to caller.
  res.json(filteredTodos);
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

// PUT /todos/:id
app.put('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  var body = _.pick(req.body,'description','completed');
  var validAtrributes = {};  // stores values we want to use to update our object
  
  // First check if the matched todo exists.
  if (!matchedTodo) {
    return res.status(404).send('No MatchedTodo-->' + todoId + ' ' + matchedTodo);
  }
  
  // validate!
  // Introducing .hasOwnProperty returns true if object has the parameter property
  if (body.hasOwnProperty('completed') && 
      _.isBoolean(body.completed)) {
    validAtrributes.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) { // something wrong in Kansas
      return res.status(400).send('Bad Boo');
  } 
  
  if (body.hasOwnProperty('description') && 
      _.isString(body.description)
      && body.description.trim().length > 0) {
    validAtrributes.description = body.description;
  } else if (body.hasOwnProperty('description')) { 
      return res.status(400).send('Bad Des');
  } 
  
  // If we got this far we are good to update.
  // Introducing _.Extend --> Copy all of the properties in the source objects over 
                           // to the destination object, and return the destination object. 
  // Remember, objects are passed ByRef so this full syntax not needed: matchedTodo = _.extend(matchedTodo, validAtrributes)
  /* Syntax
    _.extend({name: 'moe'}, {age: 50});
    => {name: 'moe', age: 50}
  */
  _.extend(matchedTodo, validAtrributes) 
  res.json(matchedTodo);
})




// LET'S LISTEN.....
app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
