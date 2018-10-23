var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Users = new Schema ({

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  upvoted: {
    bldg: {
      bldgCode: {
        type: String,
        rooms: {
          type: [String]
        }
      }
    }
  },

  downvoted: {
    bldg: {
      bldgCode: {
        type: String,
        rooms: {
          type: [String]
        }
      }
    }
  },

});
