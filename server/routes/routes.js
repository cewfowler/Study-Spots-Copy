var mongoose = require('mongoose'),
    SpotModel = require('../models/spots.server.model.js'),
    spot = require('../models/spotsClass.js');

module.exports = function(app) {

  //return the database entries for all the study spots when loading the page
  app.get('/spots', function(req, res) {

    SpotModel.find({}, function(err, studySpots) {
      if (err) {
        console.log('Error retrieving spots from database');
        res.status(500).redirect('/');
      }
      res.status(200).send(studySpots);
    });

  });


  //return information on a specific building
  app.get('/spots/:bCode', function(req, res) {
      SpotModel.find({bldgCode: req.params.bCode.toUpperCase()}, function(err, bldg) {
        if (err) return err;
        res.status(200).send(bldg);
      });
  });

  // adds a new study spot to bldg with bCode
  // params: bCode,location
  // initializes study spot with no upvotes/downvotes
  //TODO: testing
  app.post('/spots/:bCode', function(req, res){
      console.log("Attempting to post new study spot");

      var newSpot = req.spot;

      SpotModel.findOneAndUpdate({bldgCode: req.params.bCode.toUpperCase()},
        {$push: {spots: newSpot}}, {new: true}, function(err, spot) {
          if (err) {
            console.log("Error updating building with code " + req.params.bCode);
            return err;
          }

          res.status(201).send();
        });

  });

  //TODO: test route
  // find specific room in a bldg
  app.get('/spots/:bCode/:room', function(req,res) {
    console.log("Retrieving room");
    SpotModel.find({bldgCode: req.params.bCode.toUpperCase()}, function(err, studySpot) {

      if (err) {
        console.log("Error finding bldg with code " + req.params.bCode);
        return err;
      }

      studySpot.find({location: req.params.room}, function(err, spot) {

        if (err) {
          console.log("Error finding room " + req.params.room + " in bldg " + req.params.bCode);
          return err;
        }

        res.status(200).send(spot);

      })
    });
  });

  /* TODO: finish route
  //update number of upvotes/downvotes for a room
  app.post('/spots/:bCode/:room', function(req,res) {
    SpotModel.find({bldgCode: req.params.bCode.toUpperCase()}, function(err, studySpot) {

      if (err) {
        console.log("Error finding bldg with code " + req.params.bCode);
        return err;
      }

      studySpot.findOneAndUpdate({location: req.params.room},
        {$set: {spots.upvotes: req.}},
        {new: true}, function(err, spot) {

        if (err) {
          console.log("Error finding room " + req.params.room + " in bldg " + req.params.bCode);
          return err;
        }

        res.status(200).send(spot);

      })
    });
  });
  */
}
