angular.module('spots').controller('AuthenticationController', ['$scope', 'Spots', '$sessionStorage', 'userService',
  function ($scope, Spots, $sessionStorage, userService) {

      $scope.$storage = $sessionStorage.$default({
        email: ""
      });

    Spots.getUser().then(function(user) {
      userService.user = user.data;
      $scope.currentUser = userService.user;
    });

    $scope.login = function (email, password) {
      Spots.login(email, password);
      $scope.$storage.email = email;
    }

    $scope.signup = function (email, password) {
      Spots.register(email, password);
      $scope.logout();
      $scope.$storage.email = email;
    }


    $scope.update = function () {
      Spots.updateUser(userService.user.email, userService.user);
    }
    $scope.logout = function () {
      Spots.logout();
      userService.user = "";
      $scope.$storage.email = "";
    }
    $scope.isLogged = function () {
      // console.log("User Email is: " + $scope.$storage.email);
      if ($scope.$storage.email == "") {
        return false;
      }
      else {
        return true;
      }
    }


  }]);
