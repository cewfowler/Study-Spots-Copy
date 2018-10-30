
//toggle menu function
function toggleMenu() {
  let menu = document.getElementById("myMenu");
  if (menu.style.width == "0px") {
    openMenu();
  } else {
    closeMenu();
  }
}

//opens the menu
function openMenu() {
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
  if (menu.style.width == "0px") {
    mapStyles.style.width = "66%";
    mapStyles.style.left = "507px";
    menu.style.width = "500px";
  }
}

//closes the menu
function closeMenu() {
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
  if (menu.style.width != "0px") {
    mapStyles.style.width = "99%";
    mapStyles.style.left = "0px";
    menu.style.width = "0px";

  }
}

//TOGGLES FORM WHEN ADD SPOT IS CLICKED
function toggleForm(){
  if (document.getElementById("addForm").style.display == "block"){
    document.getElementById("addForm").style.display = "none";
    document.getElementById("formbutton").innerHTML = "Add Spot";
  }
  else{
    document.getElementById("addForm").style.display = "block";
    document.getElementById("formbutton").style.display = "none";
  }
}

var app = angular.module('myApp', []);
app.controller('formCtrl', ['$scope', 'Spots', function($scope, Spots) {
    $scope.add = function(){
      //do some thing using $scope.bldg
      console.log($scope.bldg.bldgCode);
      return $http.post('https://study-spots-group3-1250-test.herokuapp.com/spots/' + $scope.bldg.bldgCode, $scope.bldg.roomName);
      }
    //$scope.add()
}
]);


//TODO: Implement pop-up functionality
//TODO: Implement form show/hide for button
//TODO: Adjust panning for the markers
//TODO: Implement filtering of the markers
//TODO: Implement more user-settings for map layers (building names, satellite)
