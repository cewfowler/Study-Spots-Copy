var mongoose = require('mongoose'),
    SpotModel = require('../models/spots.server.model.js'),
    spot = require('../models/spotsClass.js');

module.exports = function(app) {

  app.post('/', function(req, res){
      console.log("Posting new study spot");
  });
}
