'use strict';

/* Filters */

app.filter('statusFiltered', function () {
  return function (todos, currentStatus) {
    var filtered = [];
    var status;
    if (currentStatus !=2 ){
      if (currentStatus === 0) status = false;
      else status = true;

      for (var i = 0; i < todos.length; i++) {
        if (todos[i].done === status) {
          filtered.push(todos[i]);
        }
      }
    }
    else filtered = todos;
    //console.log('filtered', filtered.length);
    return filtered;

  };
});