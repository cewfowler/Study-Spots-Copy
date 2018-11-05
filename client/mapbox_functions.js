
//TODO: Use the geoJSON package to convert the incoming response data with appropriate information
//Link: https://www.npmjs.com/package/geojson
//Ideally, just need to pull response data from http.get or routes
//Once response data is pulled, use "GeoJSON.parse(data, {Point: ['latitude', 'longitude']});"
  //This will create a set of features and use the existent values for lat / lon
  //To create points that will be used for the geoJSON file
    //After this conversion, it should only have to be passed into the mapLayer to load properly


angular.module('spots').controller('SpotsController', ['$scope', 'Spots',
  function($scope, Spots) {


  }]);
