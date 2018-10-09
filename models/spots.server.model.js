var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var spotsSchema = new Schema ({

  location: {
    type: String,
    required: true
  },

  upvotes: Number,
  downvotes: Number,
  createdAt: Date,
  updatedAt: Date

});

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
