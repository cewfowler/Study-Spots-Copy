mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adamhochberger/cjn1ri2mp52yi2smkz22nskdj', //fully populated stylesheet
  center: [-82.346109, 29.648578], // starting position [lng, lat]
  zoom: 16.5 // starting zoom
  //29.648578, -82.346109 for Gainesville lat/lng, switch for center
});

map.on('load', function () {
  map.addLayer({
    id: 'buildings',
    type: 'symbol',
    source: {
      type: 'geojson',
      url: 'adamhochberger.cjnaxr1a505ge33mnxjgmxgke-0cehz' //fully populated UF builds per uf_api
    }
  });
});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['buildings'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.COMMON_NAME + '</h3><p>'
      + 'Spot 1 <br>'
      + 'Spot 2 <br>'
      + '</p>'
      + '<button class="trigger" id="formbutton" onclick="showForm()">Add Spot</button>'
    )
    .addTo(map);
  openMenu();
});

map.on('mouseenter', 'buildings', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'buildings', function () {
  map.getCanvas().style.cursor = '';
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

//toggle menu function
function toggleMenu() {
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
  if (menu.style.width == "0px") {
    mapStyles.style.width = "66%";
    mapStyles.style.left = "507px";
    menu.style.width = "500px";
  } else {
    mapStyles.style.width = "99%";
    mapStyles.style.left = "0px";
    menu.style.width = "0px";

  }
}

//just opens the menu
function openMenu() {
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
  if (menu.style.width == "0px") {
    mapStyles.style.width = "66%";
    mapStyles.style.left = "507px";
    menu.style.width = "500px";
  }
}


//TODO: Implement pop-up functionality
//TODO: Implement form show/hide for button
//TODO: Adjust panning for the markers
//TODO: Implement filtering of the markers
//TODO: Implement more user-settings for map layers (building names, satellite)