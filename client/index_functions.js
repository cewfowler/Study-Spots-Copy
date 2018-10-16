mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWhvY2hiZXJnZXIiLCJhIjoiY2puMHc3YzhxMDBxNjN4cjRiZnhydHBxOCJ9.raEmNfLBC69cKpMn-aqznA';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adamhochberger/cjn1ri2mp52yi2smkz22nskdj', //fully populated stylesheet
  center: [-82.346109, 29.648578], // starting position [lng, lat]
  zoom: 16.5 // starting zoom
  //29.648578, -82.346109 for Gainesville lat/lng, switch for center
});

map.on('load', function() {
  map.addLayer({
    id: 'historical-places',
    type: 'circle',
    source: {
      type: 'vector',
      url: 'adamhochberger.a4jhjxtv' //fully populated UF builds per uf_api
    },
    'source-layer': 'result-2-5wxyl3',
  });
});


//should delete later
function openMenu(){
  document.getElementById("myMenu").style.width = "500px";
}

//should delete later
function closeMenu(){
  document.getElementById("myMenu").style.width = "0";
}

//toggle menu function
function toggleMenu(){
  let menu = document.getElementById("myMenu");
  let mapStyles = document.getElementById("map");
    if (menu.style.width == "0px") {
        mapStyles.style.width = "66%";
        mapStyles.style.left = "500px";
        menu.style.width = "500px";
    } else {
        mapStyles.style.width = "99%";
        mapStyles.style.left = "0px";
        menu.style.width = "0px";

    }
}

//TODO: Implement pop-up functionality
//TODO: Adjust panning for the markers
//TODO: Implement filtering of the markers
//TODO: Separate server into .js file so that mapbox is used properly
