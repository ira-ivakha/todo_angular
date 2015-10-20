'use strict';

/* Services */
/* example of factory and service */
app.factory('dataService', function(){
  return{
    todos: [
      {'name': '1st done', 'done': true},
      {'name': '2nd new', 'done': false},
      {'name': '3rd new', 'done': false}
    ]
  };
});

var dataServiceFn = function(){
  return{
    todos: [
      {'name': '1st done', 'done': true},
      {'name': '2nd new', 'done': false},
      {'name': '3rd new', 'done': false}
    ]
  };
};

app.service('dataService', dataServiceFn);