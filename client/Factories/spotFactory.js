//Initalizes a factory for the ng-app "spots" with the name "Spots"
angular.module('spots', []).factory('Spots', function($http) {

  //Methods variable for the SpotFactory
  var methods = {

      /*Retrieval method that does an http.get request for the basic spots route
        To be used with the initialization of the table in index.html so that all
        spot objects can be retrieved from our spots API
      */
      getAll: function() {
        return $http.get('/spots');
      },

      /*
      //Retrieval method that allows the information for a building to be recovered from the code
      getBldg: function(bCode) {
        return $http.get('/spots/' + bCode);
      },
      */

      //Retrieval method that allows the information for a room to be recovered from the name
      getRoom: function(bCode, roomName) {
        return $http.get('/spots/' + bCode + '/' + roomName);
      },

      /*Creation method that takes in current building code and room name
        To be used with the addSpot method so that the route can utilize the parameters
        to create a new object that will be pushed to the database
      */
	    create: function(bCode, roomName) {
	      return $http.post('/spots/' + bCode + '/' + roomName);
      },

      /*Update method that takes in the current building code, room name, and updatedRoom object
        To be used with upvote/downvotes and likely reservations so that server updates
        after object has been properly created and submitted
      */
      update: function(bCode, roomName, updatedRoom) {
	      return $http.put('/spots/' + bCode + '/' + roomName, {spot: updatedRoom});
      }

     };
     return methods;
});
