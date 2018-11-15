mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';

/*Creates basic map object bound to 'map' id in index.html
  Uses basic styling found at that link
  Centers around marston/turlington Hall
  Basic zoom start level
*/
//  TODO: Implement more stylings for the map for users to interact with
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adamhochberger/cjn0w9i1o97y12rp63jwo2j1k', //basic stylesheet
  center: [-82.346109, 29.648578], // starting position [lng, lat]
  zoom: 16.5 // starting zoom
  //29.648578, -82.346109 for Gainesville lat/lng, switch for center
});


//Initalizes a controller for the ng-app "spots", utilizes the $scope and the "Spots" factory
angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function ($scope, Spots) {

    let upvoted = false;
    let downvoted = false;

    //Uses the getAll function from the spotFactory file
    Spots.getAll().then(function (response) {

      //Sets the spots variable in the scope to response.data when pulled
      $scope.spots = response.data;

      /* Format for the data entries
        geoJson:
        { "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [obj.coordinates[0], obj.coordinates[1]},
              "properties": {
              // everything else
                "id": obj.id,
                "bldgCode": obj.bldgCode,
                "bldgFormalName": obj.bldgFormalName,
                "bldgName": obj.bldgName,
                "spots": obj.spots
              }
            }
        ]
      }
      */

      $scope.spots_geo = {
        "type": "FeatureCollection",
        "features": [
        ]
      }

      for (var i = 0; i < $scope.spots.length; i++) {

        //Adds triangle object to each instance of $scope.spots
        $scope.spotDetails = $scope.spots[i];

        //$scope.spotDetails.spots = testRooms;
        $scope.spotDetails.upvotes = 0;

        var obj = $scope.spots[i];
        var feature = {
          "type": "Feature",
          "properties": {
            "id": String(obj._id),
            "bldgCode": String(obj.bldgCode),
            "bldgFormalName": String(obj.bldgFormalName),
            "bldgName": String(obj.bldgName),
            "bldgNum": String(obj.bldgNum),
            "spots": obj.spots
          },
          "geometry": {
            "type": "Point",
            "coordinates": [obj.coordinates[1], obj.coordinates[0]]
          }
        }
        $scope.spots_geo.features[i] = feature;
      }

      map.addSource('spots', {
        type: 'geojson',
        data: $scope.spots_geo,
        maxzoom: 16,
        buffer: 10,
        tolerance: 10
      });
      map.addLayer({
        id: 'spots',
        type: 'symbol',
        source: 'spots',
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true
        }
      });

    }, function (error) {
      //Debug log for the response if an error was thrown
      console.log('Unable to retrieve listings:', error);
    });

    //Takes in a basic input value and sets that for the ng-repeat table to list the rooms by
    //If the same value is clicked, then the option is reversed
    $scope.sort_by = function(inputValue) {

      //Checks to see if the current value that it is sorting by is being clicked
      if ($scope.sortingOrder == inputValue) {

        //Reverses the ordering if the inputValue has been clicked
        $scope.reverse = !$scope.reverse;
      }

      //Sets sort value to the input value
      $scope.sortingOrder = inputValue;
    }

    //Outline of what the claimSpot function might look like
    $scope.claimSpot = function(bCode, roomName) {
      console.log("Claiming " + roomName + " at building with code " + bCode);
    }

    //Function that will add a spot from bldgCode
    $scope.add = function (bCode, roomName) {

      //Debugging for index of passed in spot
      console.log(bCode);
      console.log("Adding " + roomName + " to bldg " + $scope.spotDetails.bldgCode);
      Spots.create(bCode, roomName).then(function(response) {
        console.log("Woo: " + response);
      }, function (error) {
        console.log('Unable to create room:', error);

      });
      //Spots.create($scope.spots.bldg.bldgCode, $scope.bldg.roomName);

    }

    //performs the functionality of sidebar locating buidings an instantiating a popup
    //Also allows the triangles to change depending on the status of the menu_toggle

    /*TODO: Optimize the icon flipping per the secondary branch that was attempted to be merged before
      Also attempt to use fa-icons to save space on indexing and ensure that the
      it is easy to manipulate the expansions for Chris' updateRoom
      */
    $scope.showDetails = function (index) {

      $scope.spotDetails = $scope.spots[index];
      $scope.updatedRoom = $scope.spotDetails;

      //Sets the active spot to be the clicked on spot, for the sidebar menu expansion
      if ($scope.active != $scope.spotDetails.bldgCode) {
        $scope.active = $scope.spotDetails.bldgCode;
      }
      else {
        $scope.active = null;
      }

      var arrayFlyTo = $scope.spotDetails.coordinates;

      map.flyTo({
        zoom: 16.5,
        center: [arrayFlyTo[1], arrayFlyTo[0]],
        speed: 0.8,
        offset: [-255, 150],
      });

      //Performs picture get for the corresponding point that has been clicked
      var pictureURL = "https://campusmap.ufl.edu/library/photos/stars/";

      //function that creates the URL
      function fetchURL(BLDGextension) {
        // BLDGcode = feature.properties.bldgNum;
        BLDGcode = $scope.spotDetails.bldgNum;
        // console.log("Building Code: " + BLDGcode);
        if (BLDGcode.length == 1) {
          BLDGprefix = "B000";
        }
        else if (BLDGcode.length == 2) {
          BLDGprefix = "B00";
        }
        else if (BLDGcode.length == 3) {
          BLDGprefix = "B0";
        }
        else {
          BLDGprefix = "B";
        }

        //case-by-case situations for specific buildings
        //Infinity Hall
        if (BLDGcode == 3485) {
          return pictureURL + "00004629.jpg";
        }
        //Shands Cancer Center
        if (BLDGcode == 2013) {
          return pictureURL + "00001464.JPG";
        }
        //Heavener Hall
        if (BLDGcode == 65) {
          return pictureURL + "00004060.jpg";
        }
        //Hernandez Hall
        if (BLDGcode == 275) {
          return pictureURL + "00004676.jpg";
        }
        // //BUILDING NAME
        // if(BLDGcode == BUILDINGCODE){
        //   return pictureURL + "EXTENSION#";
        // }

        //used in error handling funciton: onError(this)
        errorURL = pictureURL + BLDGprefix + BLDGcode;

        //img url with initial extension of .jpg
        responseURL = pictureURL + BLDGprefix + BLDGcode + BLDGextension;
        return responseURL;

      }

      // Checks to see if there is already a popup on the map and if so, remove it
      var checkPopup = document.getElementsByClassName('mapboxgl-popup');
      if (checkPopup[0]) checkPopup[0].remove();


      //Creates popup object without the add spot function (since these will have been clicked from the menu)
      var popups = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat([arrayFlyTo[1], arrayFlyTo[0]])
        .setHTML('<h3>' + $scope.spotDetails.bldgName + '</h3><p>'
          + '</p>'
          + '<img id = "buildIMG" img src= ' + fetchURL(".jpg") + ' alt="Building Image" width="300" height="200" onerror="onError(this)">'
           )
      popups.addTo(map);
    }

    //TODO: Need to clarify way so that each building has individual values
    //Need upvoted / downvoted to be adjusted for each building
    $scope.upvote = function(room){
      var tempRoom = room;
      if(upvoted==false && downvoted==false) {
        upvoted=true;
        tempRoom.upvotes++;
      }
      else if(downvoted==true){
        downvoted=false;
        upvoted=true;
        tempRoom.upvotes = tempRoom.upvotes +2;
      }
      else {
        upvoted=false;
        tempRoom.upvotes--;
      }
      $scope.updatedRoom.spots[$scope.spotDetails.spots.indexOf(room)] = tempRoom;
    }

    //TODO: Need to clarify way so that each building has individual values
    //Need upvoted / downvoted to be adjusted for each building
    $scope.downvote = function(room){
      var tempRoom = room;
      if(upvoted==false && downvoted==false) {
        downvoted=true;
        tempRoom.upvotes--;
      }
      else if(upvoted==true){
        upvoted=false;
        downvoted=true;
        tempRoom.upvotes = tempRoom.upvotes -2;
      }
      else {
        downvoted=false;
        tempRoom.upvotes++;
      }
      $scope.updatedRoom.spots[$scope.spotDetails.spots.indexOf(room)] = tempRoom;
    }

    //Outline of what the update function might look like
    $scope.update = function(bCode, roomName, updatedRoom) {


      Spots.update(bCode, roomName, updatedRoom);

    }


    //Initalizes a basic zoom control for the Mapbox
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    //Initalizes a location finder for the Mapbox
    var locationTracker = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      showUserLocation: true
    });
    map.addControl(locationTracker, 'bottom-right');

    //Event that checks for a click on the buildings layer
    map.on('click', 'spots', function (e) {

      //Creates a features variable from the properties on the clicked point
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['spots'] // will be replaced by a local layer that gets created
      });

      //Verifies if there is a proper length for the features length
      if (!features.length) {
        return;
      }

      var feature = features[0];
      $scope.spotDetails = features[0].properties;
      console.log($scope.spotDetails);


      //basic form of the URL for the image
      var pictureURL = "https://campusmap.ufl.edu/library/photos/stars/";

      //function that creates the URL
      function fetchURL(BLDGextension) {
        // BLDGcode = feature.properties.bldgNum;
        BLDGcode = $scope.spotDetails.bldgNum;
        // console.log("Building Code: " + BLDGcode);
        if (BLDGcode.length == 1) {
          BLDGprefix = "B000";
        }
        else if (BLDGcode.length == 2) {
          BLDGprefix = "B00";
        }
        else if (BLDGcode.length == 3) {
          BLDGprefix = "B0";
        }
        else {
          BLDGprefix = "B";
        }

        //case-by-case situations for specific buildings
        //Infinity Hall
        if (BLDGcode == 3485) {
          return pictureURL + "00004629.jpg";
        }
        //Shands Cancer Center
        if (BLDGcode == 2013) {
          return pictureURL + "00001464.JPG";
        }
        //Heavener Hall
        if (BLDGcode == 65) {
          return pictureURL + "00004060.jpg";
        }
        //Hernandez Hall
        if (BLDGcode == 275) {
          return pictureURL + "00004676.jpg";
        }
        // //BUILDING NAME
        // if(BLDGcode == BUILDINGCODE){
        //   return pictureURL + "EXTENSION#";
        // }

        //used in error handling funciton: onError(this)
        errorURL = pictureURL + BLDGprefix + BLDGcode;

        //img url with initial extension of .jpg
        responseURL = pictureURL + BLDGprefix + BLDGcode + BLDGextension;
        return responseURL;

      }

      //Name variable. used to pass the name to search bar in sidemenu
      nameToPass = feature.properties.bldgName;
      //Sets a variable equal to the array of information that gets passed in from layer
      //Creates a new popup based upon the attributes of the clicked marker
      $scope.popup = new mapboxgl.Popup({ offset: [0, -15] })

        //Sets the coordinates of the popup to that of the clicked point
        .setLngLat(feature.geometry.coordinates)

        //Sets the HTML for the popup
        //Creates an add form button along with the implementation for a spotsApp
        .setHTML('<h3>' + feature.properties.bldgName + '</h3><p>'
          + '</p>'
          + '<img id = "buildIMG" img src= ' + fetchURL(".jpg") + ' alt="Building Image" width="300" height="200" onerror="onError(this)">'
          + '<br><br><button class="trigger" id="formbutton" onclick="passNameToSearchBar(nameToPass)">Reserve Spot</button>'
        )
        .addTo(map);

        $scope.spotQuery = $scope.spotDetails.bldgName;
        $scope.apply();

      //Finds the menu documentElement
      var menu = document.getElementById("myMenu");
      var flyToPoint = feature.geometry.coordinates;

      //Checks if the menu is open or not and adjust the fly/panover properly
      if (menu.style.width != "0px") {
        map.flyTo({
          center: flyToPoint,
          speed: 0.2,
          offset: [-255, 150],
        });
      }
      else {
        map.flyTo({
          center: flyToPoint,
          speed: 0.2,
          offset: [0, 150],
        });
      }
    });


    //changes mouse into pointer hand when hovering onto building marker
    map.on('mouseenter', 'spots', function () {
      map.getCanvas().style.cursor = 'pointer';
    });


    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'spots', function () {
      map.getCanvas().style.cursor = '';
    });

  }]);



//Function that returns what pictures to use for an error
function onError(img) {
  delete img.onerror;
  var n = img.src;
  img.src = errorURL + ".JPG";
  if (n.endsWith(".JPG")) {
    img.width = 200;
    img.height = 200;
    img.src = "images/gator404.png"
  }
}
