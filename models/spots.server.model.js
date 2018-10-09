var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var spotsSchema = new Schema ({
  bldgName: {
    type: String,
    required: true
  },

  bldgCode: {
    type: String,
    required: true,
    unique: true
  },

  coordinates: {
    lattitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },

  spots {
    type: [Schema.types.mixed]
  },

  updatedAt: Date

});

//TODO: in order to add a spot to the array, must call
// spots.markModified('spots');

//TODO: make sure createdAt is initialized in the add/create study spot function
//This function is meant to change the updated time to the save time
spotsSchema.pre('save', function(next) {
  var curTime = new Date;
  this.updatedAt = curTime;

  next();
});

// Use schema to instantiate a mongoose model
var Spot = mongoose.model('Spot', spotsSchema);

module.exports = Spot;
