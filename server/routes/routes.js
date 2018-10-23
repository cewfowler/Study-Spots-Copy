var mongoose = require('mongoose'),
    SpotModel = require('../models/spots.server.model.js'),
    spot = require('../models/spotsClass.js');

module.exports = function(app) {
  /*
  //load page
  app.get('/', function(req, res) {
    res.status(200)

  });*/

  //return the database entries for all the study spots when loading the page
  //TODO: testing
  app.get('/spots', function(req, res) {

    SpotModel.find({}, function(err, studySpots) {
      if (err) {
        console.log('Error retrieving spots from database');
        res.status(500).redirect('/');
      }
      res.status(200).send(studySpots);
    });

  });

  // adds a new study spot to bldg with bCode
  // params: bCode,location
  // initializes study spot with no upvotes/downvotes
  // TODO: check if bCode can be called directly or if it has to be pulled from req
  //TODO: testing
  app.post('/spots/:bCode', function(req, res){
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

  //return information on a specific building
  //TODO: testing
  app.get('/spots/:bCode', function(req, res) {
      SpotModel.find({bldgCode: bCode}, function(err, bldg) {
        if (err) return err;
        res.status(200).send(bCode);
      });
  });

  app.post('/spots/:bCode/:room', function(req,res) {

  });

}
