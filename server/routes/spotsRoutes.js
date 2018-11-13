//var mongoose = require('mongoose'),
var SpotModel = require('../models/spots.server.model.js'),
    //config = require('../../config/config'),
    StudySpot = require('../models/spotsClass.js');

module.exports = function(app) {

  //mongoose.createConnection(config.spotsdb.uri);
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
  app.post('/spots/:bCode/:room', function(req, res){
      console.log("Attempting to post new study spot");

      //TODO: which of these to use
      //var newSpot = req.params.spot;
      var newSpot = new StudySpot(req.params.room);
      var exists = false;


      SpotModel.findOne({bldgCode: req.params.bCode.toUpperCase()}, function(err, spot) {
        /*
        var roomExists = spot.spots.toBSON();
        for (i = 0; i < roomExists.length; i++){
          if (roomExists[i].location == newSpot.location) {
            //req.flash("Spot currently exists");
            console.log("Room already exists");
            exists = true;
            res.status(202).send();
          }
        }
      });*/

      if (!exists) {
        SpotModel.findOneAndUpdate({bldgCode: req.params.bCode.toUpperCase()},
          {$push: {spots: newSpot}}, {new: true}, function(err, spot) {

            if (err) {
              console.log("Error updating building with code " + req.params.bCode);
              return err;
            }

            res.status(201).send(spot);
        });
      }

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

      studySpot.spots.find({location: req.params.room}, function(err, spot) {

        if (err) {
          console.log("Error finding room " + req.params.room + " in bldg " + req.params.bCode);
          return err;
        }

        res.status(200).send(spot);

      })
    });
  });

  // TODO: finish route
  //update number of upvotes/downvotes for a room
  app.post('/spots/:bCode/:room', function(req,res) {
    SpotModel.find({bldgCode: req.params.bCode.toUpperCase()}, function(err, studySpot) {

      if (err) {
        console.log("Error finding bldg with code " + req.params.bCode);
        return err;
      }
      console.log(studySpot.spots);

      studySpot.spots.find({location: req.params.room}, function(err, spot) {
        if (err) {
          console.log("Error finding room " + req.params.room + " in bldg " + req.params.bCode);
          return err;
        }

        //TODO: think of ways other than updating from client side and saving
        // ie. update from server side and then update client
        // or only call this function once the room menu has closed
        //spot = req.params.spot
        spot = req.spot;

        //TODO: Do these go below this find method?
        studySpot.markModified('spots');
        studySpot.save();
        res.status(200).send(spot);

      });

    });
  });

}
