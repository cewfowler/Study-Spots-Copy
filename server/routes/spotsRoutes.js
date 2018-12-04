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

      var newSpot = new StudySpot(req.params.room);
      var exists = false;

      //TODO: Test toLowerCase to check when user enters room with different capitalized letters
      SpotModel.findOne({bldgCode: req.params.bCode.toUpperCase()}, function(err, spot) {

        var roomExists = spot.spots.toBSON();
        for (i = 0; i < roomExists.length; i++){
          if (roomExists[i].location.toLowerCase() == newSpot.location) {
            req.flash("Spot currently exists");
            console.log("Room already exists");
            exists = true;
            return;
          }
        }
      }).then(function() {
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

        else {
          res.status(302).send();
        }
    })

  });

  //TODO: test route
  // find specific room in a bldg
  app.get('/spots/:bCode/:room', function(req,res) {
    console.log("Retrieving room");
    var reqSpot;

    SpotModel.findOne({bldgCode: req.params.bCode.toUpperCase()}, function(err, studySpot) {

      if (err) {
        console.log("Error finding bldg with code " + req.params.bCode);
        return err;
      }
      else if (!studySpot) {
        console.log("Building not found");
        return;
      }
      console.log(studySpot);
      var curSpots = studySpot.spots.toBSON();

      for (i = 0; i < curSpots.length; i++){
        //TODO: Test toLowerCase to check when user enters room with different capitalized letters
        if (curSpots[i].location.toLowerCase() == req.params.room.toLowerCase()) {
          console.log("Returning room " + curSpots[i].location);
          reqSpot = curSpots[i];
        }
      }

    }).then(function() {
      if (reqSpot) {
        console.log("Room found");
        res.status(201).send(reqSpot);
      }
      else {
        console.log("Room not found");
        res.status(302).send();
      }
    });
  });


  // TODO: finish route
  //update number of upvotes/downvotes for a room
  app.put('/spots/:bCode/:room', function(req,res) {
    var rooms;
    var update = true;

    SpotModel.findOne({bldgCode: req.params.bCode.toUpperCase()}, function(err, studySpot) {

      if (err) {
        console.log(err);
        return err;
      }

      else if (!studySpot) {
        console.log("Building not found");
        return;
      }

      rooms = studySpot.spots.toBSON();
    }).then(function() {

      if (!rooms){
        console.log("No rooms found");
        res.status(302).send();
        update = false;
        return;
      }

      else {

        for (i = 0; i < rooms.length; i++) {

          if (rooms[i].location.toLowerCase() == req.params.room.toLowerCase()) {
            //TODO: figure out method to change
            console.log("Swapping old room info with updated info");
            rooms[i] = req.body.spot;
            return;
          }
        }

        update = false;
      }
    }).then(function() {
      
      if (update) {
        SpotModel.findOneAndUpdate({bldgCode: req.params.bCode}, {$set: {spots: rooms}},
          {new: true}, function(err, updatedSpot) {
            if (err) {
              console.log(err);
              res.status(500).send();
              return(err);
            }
            else {
              res.status(201).send(updatedSpot);
            }
          });

      }

      else {
        console.log("Unable to update room");
        res.status(302).send();
      }

    });

  });
}
