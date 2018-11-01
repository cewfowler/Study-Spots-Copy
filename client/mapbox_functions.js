
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';
  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adamhochberger/cjn1ri2mp52yi2smkz22nskdj', //fully populated stylesheet
  center: [-82.346109, 29.648578], // starting position [lng, lat]
  zoom: 16.5 // starting zoom
  //29.648578, -82.346109 for Gainesville lat/lng, switch for center
});


//on click, center map onto building marker
map.on('click', 'buildings', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['buildings'] // will be replaced by a local layer that gets created
  });

  if (!features.length) {
    return;
  }

  //Sets a variable equal to the array of information that gets passed in from layer
  var feature = features[0];

  //Creates a new popup based upon the attributes of the clicked marker
  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.COMMON_NAME + '</h3><p>'
      + '</p>'
      + '<button class="trigger" id="formbutton" onclick="toggleForm()">Add Spot</button>'
      + '<div class="form-popup" id="addForm" ng-app="spotsApp" ng-controller="SpotsController">'
      +  '<form novalidate>'
      +    '<br><input type="text" ng-model="bldg.roomName" placeholder="Room Name"><br>'
      +    '<button id="addbutton" ng-click="add()">Add</button>'
      +  '</form>'
      + '</div>'
    )
    .addTo(map);
  // openMenu();


  let menu = document.getElementById("myMenu");
  var flyToPoint = e.features[0].geometry.coordinates;

  //this if-else statement is used for shifting the center of the map based on if the
  //menu bar is open
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
map.on('mouseenter', 'buildings', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'buildings', function () {
  map.getCanvas().style.cursor = '';
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');
