
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
    mapStyles.style.left = "33%";
    menu.style.width = "33%";
  }
}

//closes the menu
function closeMenu() {
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
  if (menu.style.width != "0px") {
    mapStyles.style.width = "99%";
    mapStyles.style.left = "0%";
    menu.style.width = "0px";

  }
}

//TOGGLES FORM WHEN ADD SPOT IS CLICKED
function toggleForm() {
  if (document.getElementById("addForm").style.display == "block") {
    document.getElementById("addForm").style.display = "none";
    document.getElementById("formbutton").innerHTML = "Add Spot";
  }
  else {
    document.getElementById("addForm").style.display = "block";
    document.getElementById("formbutton").style.display = "none";
  }
}

// Get the modal
var modal = document.getElementById('login-id');
var modal2 = document.getElementById('signup-id');
var modal3 = document.getElementById('account-id');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
    if (event.target == modal3) {
      modal3.style.display = "none";
    }
}

//automatically searches building on click from within map
function nameToSidebar(name) {
  openMenu();
  var scope = angular.element($("#mySearch")).scope();
  scope.$apply(function () {
    scope.spotQuery = name;
  })
}

//button to clear search box
function clearSearchBox() {
  var scope = angular.element($("#mySearch")).scope();
  scope.$apply(function () {
    scope.spotQuery = "";
  })
}

<<<<<<< HEAD
// function checkLoggedIn() {
//   var obj;
//   return fetch('/loggedIn')
//   .then(res => res.json())
//   .then(data => obj = data)
//   .then(obj => console.log(obj));
// }
=======
//show password checkbox
function togglePassword(){
  if (document.getElementById("checkPassword").type == "password"){
    document.getElementById("checkPassword").type = "text";
  }
  else{
    document.getElementById("checkPassword").type = "password";
  }
}


//Smooth scroll down when button is pressed
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});
>>>>>>> 1e04b4cb9874d7db90bc2d9b6a1b6f4e9f68bf33

//TODO: Implement filtering of the markers
//TODO: Implement more user-settings for map layers (building names, satellite)
