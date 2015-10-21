'use strict';

/* Controllers */

var app = angular.module('todoControllers', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
        .when('/', {
          templateUrl: 'list.html'
        })
        .when('/view', {
          templateUrl: 'ordered-list.html'
        })
        .otherwise({
          template: "<h2 class='app-title'>404 - page not found :(</h2>"
        });
      //$locationProvider.html5mode(true);
  });


app.controller('ToDoCtrl', function($scope, $http) {
  var date = new Date();
  $scope.today = date;
  $scope.isChecked=false;
  $scope.checked = 'is_checked';
  $scope.title = 'ToDoApp';
  /*$scope.todos = [
    {'name': '1st done', 'done': true},
    {'name': '2nd new', 'done': false},
    {'name': '3rd new', 'done': false}
  ];
  */
 // $scope.todos = dataService.todos;
  /*----loading array from localstorage---*/
  $scope.todos = loadTodos();
  console.log($scope.todos);
  console.log($scope.todos.length);


  $scope.deleteItem = function(index, $event){
    $event.preventDefault();
    $scope.todos.splice(index, 1);
    storeTodos($scope.todos);
  };

  $scope.refreshStorage = function(done){

    storeTodos($scope.todos);
    loadTodos();
    //$scope.$apply();
  };

  $scope.deleteCompleted = function(todos){
    var i= 0;

    while (i< todos.length){
      //console.log(todos[i]);
      if (todos[i].done !== true)
      {
        i+=1;
      }
      else {
        todos.splice(i, 1);
      }
    }
    localStorage["todos"] = JSON.stringify(todos);
  };

  $scope.checkAll = function(todos, isChecked) {
    var i= 0;
   $scope.isChecked = !(isChecked);
    //console.log(isChecked);
    while (i< todos.length){
      todos[i].done = isChecked;
      i++;
    }
    storeTodos($scope.todos);
  };


  /*
  $scope.showItem = function(itemClass, $event){
    //$event.preventDefault();
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
  };*/
});

app.controller('addToDoCtrl', ['$scope', function($scope) {
  $scope.text = '';
  $scope.todonew = {'name': '', 'done' : false, 'date' : '' };
  $scope.submit = function() {
    if ($scope.text) {
      $scope.todonew.name = this.text;
      $scope.todos.push(this.todonew);
      $scope.todonew = {'name': '', 'done' : false, 'date' : $scope.today };
      $scope.text = '';
    }
    storeTodos($scope.todos);
  };

}]);



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
