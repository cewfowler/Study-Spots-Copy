angular.module('spots').controller('AuthenticationController', ['$scope', 'Spots', '$localStorage', 'userService',
  function($scope, Spots, $localStorage, userService){

    $scope.$storage = $localStorage.$default({
      email: ""
    });

    if($scope.$storage.email != "") {
      Spots.getUser($scope.$storage.email).then(function(user) {
        userService.user = user.data;
      });
    }

    $scope.login = function(email, password){
      Spots.login(email, password);
      $scope.$storage.email = email;
    }

    $scope.signup = function(email, password){
      Spots.register(email, password);
      $scope.$storage.email = email;
    }

    $scope.current = function(){
      console.log(userService.user);
    }

    $scope.update = function(){
      Spots.updateUser(userService.user.email, userService.user);
    }
    $scope.logout = function() {
      Spots.logout();
      userService.user = "";
      $scope.$storage.email = "";

    }
    $scope.current = function() {
      console.log(userService.user);
    }
  }]);
