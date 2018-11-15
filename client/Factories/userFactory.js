//Initalizes a factory for the ng-app "spots" with the name "Spots"
angular.module('spots', []).factory('Users', function($http) {
  var methods = {
    register: function(email, password) {
      const options = {
        email: email,
        password: password
      };

      return $http.post('/user/register', options);
    },

    login: function(email, password) {
      const options = {
        email: email,
        password: password
      };

      return $http.post('/user/login', options);
    }
  };
  return methods;
});
