angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function($scope, Spots) {
    /* Get all the listings, then bind it to the scope */

    //Uses the getAll function from
    Spots.getAll().then(function(response) {
      console.log(response);
      $scope.spots = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.add = function(){
      //do some thing using $scope.bldg
      
      console.log($scope.spots.bldg.bldgCode);
      return $http.post('/spots/' + $scope.bldg.bldgCode, $scope.bldg.roomName);
      }
}]);
