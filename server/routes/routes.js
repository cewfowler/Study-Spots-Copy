var mongoose = require('mongoose'),
    SpotModel = require('../models/spots.server.model.js'),
    spot = require('../models/spotsClass.js');

module.exports = function(app) {

  //return the database entries for all the study spots when loading the page
  //TODO: testing
  app.get('/', function(req, res) {

    SpotModel.find({}, {sort: {bldgCode: 1}}, function(err, studySpots) {
      if (err) {
        console.log('Error retrieving spots from database');
        return err;
      }
      res.status(200).send(studySpots);
    });

  });

  // the only thing that should be passed in the request is the building bCode
  // and the location/room number for the new spot
  // TODO: check if bCode can be called directly or if it has to be pulled from req
  //TODO: testing
  app.post('/:bCode', function(req, res){
      console.log("Attempting to post new study spot");

      var newSpot = req.spot;

      SpotModel.findOneAndUpdate({bldgCode: bCode},
        {$push: {spots: newSpot}}, {new: true}, function(err, spot) {
          if (err) {
            console.log("Error updating building with code " + bCode);
            return err;
          }

          res.status(201).send();
        });

  });

  //TODO: testing
  app.get('/:bCode', function(req, res) {
      SpotModel.find({bldgCode: bCode}, function(err, bldg) {
        if (err) return err;
        res.status(200).send(bCode);
      });
  });

}
