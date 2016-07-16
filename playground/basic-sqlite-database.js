var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
  description:{
    type: Sequelize.STRING
  },
  completed: {
    type: Sequelize.BOOLEAN
  }
})

sequelize.sync().then(function() {  // This is a promise
  console.log('Everthing is synced ' + __dirname);
  
  Todo.create({
    description: 'Waalking dog',
    completed: false
  }).then(function(todo) {
    console.log(' -- ');
    console.log('Finished creating the following todo:');
    console.log(todo);
  })
})

 