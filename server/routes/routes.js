var mongoose = require('mongoose'),
    SpotModel = require('../models/spots.server.model.js'),
    spot = require('../models/spotsClass.js');

module.exports = function(app) {

  // the only thing that should be passed in the request is the building bCode
  // and the location/room number for the new spot
  app.post('/:bCode', function(req, res){
      console.log("Attempting to post new study spot");

      var newSpot = req.spot;
      
      SpotModel.findOneAndUpdate({bldgCode: bCode},
        {$push: {spots: newSpot}}, {new: true}, function(err, spot) {
          if (err) {
            console.log("Error updating building with code " + bCode);
          }

          res.status(201).send();
        });

  });

}
