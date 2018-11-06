//Initalizes a controller for the ng-app "spots", utilizes the $scope and the "Spots" factory
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';


angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function($scope, Spots) {

    //Uses the getAll function from the spotFactory file
    ////////TODO: Ensure this works properly with the spotsRouters
    Spots.getAll().then(function(response) {

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

      for (var i = 0; i < $scope.spots.length; i++){
        var obj = $scope.spots[i];
        var feature = {
          "type": "Feature",
          "properties": {
            "id": String(obj._id),
            "bldgCode": String(obj.bldgCode),
            "bldgFormalName": String(obj.bldgFormalName),
            "bldgName": String(obj.bldgName),
            "spots": obj.spots
          },
          "geometry": {
            "type": "Point",
            "coordinates": [obj.coordinates[1], obj.coordinates[0]]
          }
        }
        $scope.spots_geo.features[i] = feature;
      }
      console.dir($scope.spots_geo);
    }, function(error) {
      //Debug log for the response if an error was thrown
      console.log('Unable to retrieve listings:', error);
    });


    //Function that will add a spot from bldgCode
    $scope.add = function(index){

      ////////TODO: Need to add proper add functionality once local markers can return information
      //This may not work fully, copied it from the other index_functions controller to condense
      console.log("Adding to bldg " + $scope.spots[index].bldg.bldgCode);
      //Spots.create($scope.spots.bldg.bldgCode, $scope.bldg.roomName);

    }

    $scope.showDetails = function(index) {
      $scope.spotDetails = $scope.spots[index];
      console.log($scope.spotDetails);
    }

      //Initializes the map variable from the Map constructor
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/adamhochberger/cjn0w9i1o97y12rp63jwo2j1k', //basic stylesheet
      center: [-82.346109, 29.648578], // starting position [lng, lat]
      zoom: 16.5 // starting zoom
      //29.648578, -82.346109 for Gainesville lat/lng, switch for center
    });
    //Method that will initialize local points on the map (need to be able to convert JSON data first)
    map.on('load', function(e) {

      map.addSource('spots', {
            type: 'geojson',
            data: $scope.spots_geo,
            maxzoom: 16,
            buffer: 10,
            tolerance: 10
        });
        map.addLayer({
          id: 'spots',
          type: 'circle',
          source: 'spots'
        });
    });


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
      console.log(features);
      var feature = features[0];
      $scope.spotDetails = features[0].properties;
      console.log($scope.spotDetails);

      //Sets a variable equal to the array of information that gets passed in from layer

      //Creates a new popup based upon the attributes of the clicked marker
      $scope.popup = new mapboxgl.Popup({ offset: [0, -15] })

        //Sets the coordinates of the popup to that of the clicked point
        .setLngLat(feature.geometry.coordinates)

        //Sets the HTML for the popup
        //Creates an add form button along with the implementation for a spotsApp
        .setHTML('<h3>' + feature.properties.bldgName + '</h3><p>'
          + '</p>'
          + '<button class="trigger" id="formbutton" onclick="toggleForm()">Add Spot</button>'
          + '<div class="form-popup" id="addForm" ng-app="spotsApp" ng-controller="SpotsController">'
          +  '<form novalidate>'
          +    '<br><input type="text" ng-model="bldg.roomName" placeholder="Room Name"><br>'
          +    '<button id="addbutton" ng-click="add($index)">Add</button>'
          +  '</form>'
          + '</div>'
        )
        .addTo(map);


      // openMenu();


      //Finds the menu documentElement
      var menu = document.getElementById("myMenu");
      var flyToPoint = feature.geometry.coordinates;

      //Checks if the menu is open or not and adjust the fly/panover properly
      if (menu.style.width != "0px") {
        map.flyTo({
          center: flyToPoint,
          speed: 0.2,
          offset: [-255, 50],
        });
      }
      else {
        map.flyTo({
          center: flyToPoint,
          speed: 0.2,
          offset: [0,0],
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

    //Initalizes a basic zoom control for the Mapbox
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

}]);
