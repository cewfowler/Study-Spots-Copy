angular.module('spots').controller('AuthenticationController', ['$scope', 'Users', '$localStorage', 'userService', 
  function($scope, Users, $localStorage, userService){

    $scope.$storage = $localStorage.$default({
      email: ""
    });

    $scope.login = function(email, password){
      Users.login(email, password);
      $scope.$storage.email = email;
      userService.user = user.data;
    }

    $scope.signup = function(email, password){
      Users.register(email, password);
      $scope.$storage.email = email
      userService.user = user.data;
    }

    $scope.current = function(){
      Users.getUser($scope.$storage.email).then(function(user) {
        userService.user = user.data;
      });

    }
  }]);
