angular.module('spots', []).factory('Spots', function($http) {
  var methods = {
      getAll: function() {
        return $http.get('/spots/');
      },

	    create: function(bCode) {
	      return $http.post('/spots/' + bCode);
      },
     };
     return methods;
});
