var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema,
    db = mongoose.createConnection(config.spotsdb.uri);

var spotsSchema = new Schema ({
  bldgName: {
    type: String,
    required: true
  },

  bldgFormalName: String,

  bldgCode: {
    type: String,
    required: true,
    unique: true
  },

  coordinates: {
    type: [Number],
    required: true
  },

  spots: {
    type: [Schema.Types.mixed]
  },

  updatedAt: Date

});

//TODO: in order to add a spot to the array, must call
// spots.markModified('spots');

//TODO: make sure createdAt is initialized in the add/create study spot function
//This function is meant to change the updated time to the save time
spotsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Use schema to instantiate a mongoose model
var Spot = db.model('Spot', spotsSchema);

module.exports = Spot;
