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

  //keeps track of upvoted rooms
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

  //keeps track of downvotes rooms
  downvoted: {
    bldg: {
      bldgCode: {
        type: String,
        rooms: {
          type: [String]
        }
      }
    }
  }

});
