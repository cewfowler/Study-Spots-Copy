
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
var modal2 = document.getElementById('signin-id');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
}

//Passes the buildinng
function passNameToSearchBar(buildingName) {
  openMenu();
  let searchBar = document.getElementById("mySearch");
  searchBar.value = buildingName;
  // console.log("This is q " + searchBar);
}

//TODO: Implement filtering of the markers
//TODO: Implement more user-settings for map layers (building names, satellite)
