angular.module('spots').controller('AuthenticationController', ['$scope', 'Users',
  function($scope, Users){
    $scope.login = function(email, password){
      Users.login(email, password);
    }

    $scope.signup = function(email, password){
      Users.register(email, password);
    }

  }]);
