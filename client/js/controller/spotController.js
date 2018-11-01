//Initalizes a controller for the ng-app "spots", utilizes the $scope and the "Spots" factory
angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function($scope, Spots) {

    //Uses the getAll function from the spotFactory file
    ////////TODO: Ensure this works properly with the spotsRouters
    Spots.getAll().then(function(response) {

      //Debug log for the response from the function
      console.log(response);

      //Sets the spots variable in the scope to response.data when pulled
      $scope.spots = response.data;

    }, function(error) {

      //Debug log for the response if an error was thrown
      console.log('Unable to retrieve listings:', error);
    });

    //Function that will add a spot from bldgCode
    $scope.add = function(){

      ////////TODO: Need to add proper add functionality once local markers can return information
      //This may not work fully, copied it from the other index_functions controller to condense
      
      console.log($scope.spots.bldg.bldgCode);
      return $http.post('/spots/' + $scope.bldg.bldgCode, $scope.bldg.roomName);
    }

}]);
