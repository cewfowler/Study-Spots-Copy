
//Utilizes mapbox token from the website

//event listener for a click on the buildings layer of the map
const Json2csvParser = require('json2csv').Parser;
var fields = ['_id', 'bldgFormalName', 'bldgName', 'bldgCode', 'spots', 'coordinates'];
var opts = { fields };

var parser = var Json2csvParser(opts);
var csv = parser.parse($scope.spots);
console.log(csv);
