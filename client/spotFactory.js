angular.module('spots', []).factory('Spots', function($http) {

  var methods = {
      //Basic getAll methods for the spots url
      //TODO: adjust this according to spotsRoutes.js file
      getAll: function() {
        return $http.get('/spots');
      },

      getBldg: function(bCode) {
        return $http.get('/spots/' + bCode);
      },

      getRoom: function(bCode, roomName) {
        return $http.get('/spots/' + bCode + '/' + roomName);
      },

      //Basic create methods for the spots url and building code
	    create: function(bCode, roomName) {
	      return $http.post('/spots/' + bCode + '/' + roomName);
      },

      update: function(bCode, room, updatedRoom) {
	      return $http.put('/spots/' + bCode + '/' + room), {spot: updatedRoom});
      },
     };
     return methods;
});
