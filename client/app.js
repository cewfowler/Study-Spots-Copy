/* register the modules the application depends upon here*/
angular.module('spots', ['ngStorage']).service('userService', function() {
  // private variable
  var _user;
  this.user = _user;
});

/* register the application and inject all the necessary dependencies */
var app = angular.module('spotsApp', ['spots']);
