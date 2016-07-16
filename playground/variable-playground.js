//  If you pass an object to a function and you assign a new value
//  to that argument, the original variable will NOT get updated.
//  BUT, if you mutate, IE change, the parameter, then the
//  original variable passed WILL get updated!

var person = {
  name: 'Andrew',
  age: 21
};

function updatePersonWontUpdateOriginal (obj) {
  obj = {
    name: 'Andrew',
    age: 24
  }
}

updatePersonWontUpdateOriginal (person);
console.log(person);

function updatePersonWILLUpdateOriginal (obj) {
  obj.age = 24;
}

updatePersonWILLUpdateOriginal(person);
console.log(person);

// Try the same thing with an array
console.log(' --- ' );
var ary = [13,26];

function wontUpdateOriginalArray(a) {
  a = [13,26,39];
}

wontUpdateOriginalArray(ary);
console.log(ary);

function willUpdateOriginalArray(a) {
  a.push(39);
}

willUpdateOriginalArray(ary);
console.log(ary);

