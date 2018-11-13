
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

//toggles signup form
function toggleLogin(){
  //open login form
  if (document.getElementById("loginForm").style.display =="none"){
    //make sure both login form and signup form arent open at
    //the same time
    if (document.getElementById("signupForm").style.display == "block"){
          document.getElementById("signupForm").style.display = "none";
    }
    document.getElementById("loginForm").style.display = "block";
  }

  //close login form
  else{
    document.getElementById("loginForm").style.display = "none";
  }
}

//toggles login form
function toggleSignup(){
  //Open signup form
  if (document.getElementById("signupForm").style.display == "none"){
    //Close login if opened
    if (document.getElementById("loginForm").style.display == "block"){
      document.getElementById("loginForm").style.display = "none";
    }
    document.getElementById("signupForm").style.display = "block";
  }

  //Close signup form
  else{
    document.getElementById("signupForm").style.display = "none";
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
