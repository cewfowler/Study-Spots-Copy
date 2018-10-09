var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema for adding building with their coordinates to the map
var bldgsSchema = new Schema ({
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
    lattitude: Number,
    longitude: Number
  }

});

var Bldg = mongoose.model('Bldg', bldgsSchema);

module.exports = Bldg;
