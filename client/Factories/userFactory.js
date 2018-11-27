//Initalizes a factory for the ng-app "spots" with the name "Users"
angular.module('spots').factory('Users', function($http) {
  var methods = {
    register: function(email, password) {
      /*
      const data = {
        email: email,
        password: password
      };*/

      return $http({
        url: "/user/register",
        method: "POST",
        email: email,
        password: password
      });
      
    },

    login: function(email, password) {
      const data = {
        email: email,
        password: password
      };

      return $http.post('/user/login', data);
    }
  };
  return methods;
});
