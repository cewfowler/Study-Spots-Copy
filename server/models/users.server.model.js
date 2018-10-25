var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema,
    db = mongoose.createConnection(config.usersdb.uri);

var usersSchema = new Schema ({

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

  createdAt: {
    type: Date,
    default: Date.now()
  },

  updatedAt: {
    type: Date,
    default: Date.now()
  }

});

usersSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

var User = db.model('User', usersSchema);

module.exports = User;
