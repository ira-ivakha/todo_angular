'use strict';

/* Directives */

app.directive('todoList', function(){
  return {
    restrict: 'E',
    templateUrl : 'list.html'
  }
});

