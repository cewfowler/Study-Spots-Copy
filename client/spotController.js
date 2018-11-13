//Initalizes a controller for the ng-app "spots", utilizes the $scope and the "Spots" factory
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';

//handles if the image does not exist in .jpg OR .JPG extension. First will try in the .JPG and then revert to fallback img.
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adamhochberger/cjn0w9i1o97y12rp63jwo2j1k', //basic stylesheet
  center: [-82.346109, 29.648578], // starting position [lng, lat]
  // hash: true,
  zoom: 16.5 // starting zoom
  //29.648578, -82.346109 for Gainesville lat/lng, switch for center
});


angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function ($scope, Spots) {

    //Uses the getAll function from the spotFactory file
    ////////TODO: Ensure this works properly with the spotsRouters
    Spots.getAll().then(function (response) {

      //Debug log for the response from the function
      console.log(response);

      //Sets the spots variable in the scope to response.data when pulled
      $scope.spots = response.data;
      console.log($scope.spots);

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
      var testRooms = ["Room1"];
      $scope.spots.triangle = [];
      for (var i = 0; i < $scope.spots.length; i++) {

        //ADD triangles
        $scope.spotDetails = $scope.spots[i];

        //ADDS testRooms as dummy ROOMS with dummy UPVOTES
        $scope.spotDetails.spots = testRooms;
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
            //"spots": testRooms
          },
          "geometry": {
            "type": "Point",
            "coordinates": [obj.coordinates[1], obj.coordinates[0]]
          }
        }
        $scope.spots_geo.features[i] = feature;
      }
      for (var i = 0; i < $scope.spots.length; i++) {
        $scope.spots[i].spots = ['Test1', 'Test2'];
      }
      console.dir($scope.spots_geo);

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

    //Function that will add a spot from bldgCode
    $scope.add = function (bCode, roomName) {

      //Debugging for index of passed in spot

      //able to pull index properly from menu bar on the left sidebar
      //TODO: fix issues with pulling bldg code from map
      console.log(bCode);
      console.log("Adding " + roomName + " to bldg " + $scope.spotDetails.bldgCode);
      Spots.create(bCode, roomName).then(function(response) {
        console.log("Woo: " + response);
      }, function (error) {
        console.log('Unable to create room:', error);

      });
    };

    //Function that will sort sidebar listings and manipulates global variables
    $scope.sort_by = function(inputValue) {

      //Checks to see if the current value that it is sorting by is being clicked
      if ($scope.sortingOrder == inputValue)
        //Reverses the ordering if the inputValue has been clicked
        $scope.reverse = !$scope.reverse;

      //Sets sort value to the input value
      $scope.sortingOrder = inputValue;
    };
    //performs the functionality of sidebar locating buidings an instantiating a popup
    $scope.showDetails = function (index) {

      //Sets scope variable equal to clicked spot
      $scope.spotDetails = $scope.spots[index];

      //Logs spot for debu purposes
      console.log($scope.spotDetails);

      //Sets the active spot to be the clicked on spot, for the sidebar menu expansion
      if ($scope.active != $scope.spotDetails.bldgCode) {
        $scope.active = $scope.spotDetails.bldgCode;
      }
      else {
        $scope.active = null;
      }
      
      console.log($scope.spotDetails);


      //Set of processes that allow the map to fly to the spot clicked on from the menu
      var arrayFlyTo = $scope.spotDetails.coordinates;

      console.log(arrayFlyTo);
      map.flyTo({
        zoom: 16.5,
        center: [arrayFlyTo[1], arrayFlyTo[0]],
        speed: 0.8,
        offset: [-255, 150],

      })

      //Creates pictureURl for use in the map popup
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


      //These popups are different from the popups found on the map... they dont include the addSpot button
      var popups = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat([arrayFlyTo[1], arrayFlyTo[0]])
        .setHTML('<h3>' + $scope.spotDetails.bldgName + '</h3><p>'
          + '</p>'
          + '<img id = "buildIMG" img src= ' + fetchURL(".jpg") + ' alt="Building Image" width="300" height="200" onerror="onError(this)">'
           )
      popups.addTo(map);
    }

    //Tentative method to claim a room from a building
    $scope.claimSpot = function(bCode, roomName) {
      console.log("Claiming " + roomName + " at building with code " + bCode);
    }
    //INCREMENT DUMMY UPVOTE
    $scope.upvote = function(index){
      $scope.spotDetails = $scope.spots[index];
      $scope.spotDetails.upvotes++;
    }

    //DECREMENT DUMMY UPVOTE
    $scope.downvote = function(index){
      $scope.spotDetails = $scope.spots[index];
      $scope.spotDetails.upvotes--;
    }

    //Initializes the map variable from the Map constructor
    //Method that will initialize local points on the map (need to be able to convert JSON data first)

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
      // console.log(features);
      var feature = features[0];
      $scope.spotDetails = features[0].properties;
      console.log($scope.spotDetails);

      $scope.active = $scope.spotDetails.bldgCode;
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
          + '<br><br><button class="trigger" id="formbutton" onclick="openMenu()">Add Spot</button>'
        )
        .addTo(map);


      //Finds the menu documentElement
      var menu = document.getElementById("myMenu");
      let mapStyles = document.getElementById("map");

      var flyToPoint = feature.geometry.coordinates;
      console.log(flyToPoint);

      //Checks if the menu is open or not and adjust the fly/panover properly
      if (menu.style.width != "0px") {
        map.flyTo({
          center: flyToPoint,
          speed: 0.2,
          offset: [-255, 150],
        });
      }
      else {
        mapStyles.style.width = "66%";
        mapStyles.style.left = "507px";
        menu.style.width = "500px";
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
