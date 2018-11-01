
/* Dependencies */
var mongoose = require('mongoose'),
    Spot = require('../models/spots.server.model.js');

/*
  
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var spots = new Spot(req.body);

  /* Then save the listing */
  spot.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(spot);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.spot);
};

/* Update a listing */
exports.update = function(req, res) {
  var spot = req.listing;

  //Sets values of new listing to passed request info
  spot.name = req.body.name;
  spot.code = req.body.code;
  spot.address = req.body.address;
  spot.latitude = req.body.latitude;
  spot.longitude = req.body.longitude;

  //Saves new listing with the proper ID to the database
  spot.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(spot);
    }
  });
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  //Removes listing from the database
  spot.remove(function(err, listing) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(spot);
    }
  });
  /** TODO **/
  /* Remove the article */
};

/* Retrieve all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */

  //Finds all entries in the listing and sorts by the code
  Spot.find().sort('code').exec(function(err, results) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
    res.json(results);
  }
  });

};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Spot.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.spot = spot;
      next();
    }
  });
};
