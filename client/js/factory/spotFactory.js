angular.module('spots', []).factory('Spots', function($http) {
  var methods = {

      //Basic getAll methods for the spots url
      //TODO: adjust this according to spotsRoutes.js file
      getAll: function() {
        return $http.get('/spots/');
      },

      //Basic create methods for the spots url and building code
      //TODO: adjust this according to spotsRoutes.js file
	    create: function(bCode) {
	      return $http.post('/spots/' + bCode);
      },
     };
     return methods;
});
