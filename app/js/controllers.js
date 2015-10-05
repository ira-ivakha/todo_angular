'use strict';

/* Controllers */

var app = angular.module('todoControllers', []);


app.controller('ToDoCtrl', function($scope) {
  var date = new Date();
  $scope.today = date;
  $scope.checked = 'is_checked';
  $scope.title = 'ToDoApp';
  /*$scope.todos = [
    {'name': '1st done', 'done': true},
    {'name': '2nd new', 'done': false},
    {'name': '3rd new', 'done': false}
  ];
  */
  $scope.todos = [];
  $scope.todos = loadTodos();
  console.log($scope.todos);
  console.log($scope.todos.length);

  $scope.deleteItem = function(index, $event){
    $event.preventDefault();
    $scope.todos.splice(index, 1);
    storeTodos($scope.todos);
    //$scope.$apply();
  };

  $scope.refreshStorage = function(done){
    storeTodos($scope.todos);
  };

  $scope.showItem = function(itemClass, $event){
    $event.preventDefault();
    if (itemClass=='done') {
      $('.todo-item').addClass('hidden');
      $('.done').removeClass('hidden');
    }
    else {
      if (itemClass == 'new') {
        $('.todo-item').addClass('hidden');
        $('.new').removeClass('hidden');
      }
      else {
        $('.todo-item').removeClass('hidden')
      }
    }

  };
});
app.controller('addToDoCtrl', ['$scope', function($scope) {
  $scope.text = '';
  $scope.todonew = {'name': '', 'done' : false };
  $scope.submit = function() {
    if ($scope.text) {
      $scope.todonew.name = this.text;
      $scope.todos.push(this.todonew);
      $scope.todonew = {'name': '', 'done' : false };
      $scope.text = '';
    }
    storeTodos($scope.todos);
  };

}]);
app.directive('todoList', function(){
  return {
    restrict: 'E',
    templateUrl : 'list.html'
  }
});
app.filter('filterItem', function(){
  return function(item) {
  }
});


/*
 todoControllers.filter ('checkmark', function(){
 return function(input){
 return input ? 'checked' :'';
 }
 });
 */
/* .directive('unorderedList', function(){
 return function(scope, element, attributes){
 var attrValue = attributes["unorderedList"],
 data = scope[attrValue];
 if (angular.isArray(data)) {
 var e = angular.element('<ul class="todos">');
 var item, subitem;
 element.append(e);
 for (var i= 0; i < data.length; i++ ) {
 item=(angular.element('<li class="todo-item">'));
 subitem=(angular.element('<input type="checkbox" name="is_done" ng-class="checked" id="'+data[i].name+'" />'));
 item.append(subitem);
 subitem=(angular.element('<label for="'+data[i].name+'">').text(data[i].name));
 item.append(subitem);
 item.append(angular.element('<a href="#" class="delete-item"  ng-click="deleteItem($index)"><i class="fa fa-close"></i></a>'));

 e.append(item);
 }
 }
 }

 })
 */
var storeTodos= function(todos){
    localStorage["todos"] = JSON.stringify(todos);
};
var loadTodos = function(){
  if (localStorage["todos"] != null){
    var todos = JSON.parse(localStorage["todos"]);
  }
  else {
    todos = [];
  }
  return todos;

};