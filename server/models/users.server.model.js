var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema,
    // generate hash and salt from received password string
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    db = mongoose.connect(config.usersdb.uri);

var UsersSchema = new Schema ({

  email: {
    type: String,
    required: true
  },

  salt: {
    type: String
  },

  /*
  hash: {
    type: String
  },*/

  password: {
    type: String,
  },

  //keeps track of upvoted rooms
  upvoted: {
    rooms: {
      type: [String]
    }
  },

  //keeps track of downvotes rooms
  downvoted: {
    rooms: {
      type: [String]
    }
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  lastLogin: {
    type: Date,
    default: Date.now()
  },

  id: String

});

//sets salt and hash for password
UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

//check user entered password against password in db (using hashing)
UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  if (this.password === hash) {
    this.lastLogin = Date.now();
    return true;
  }
  return false;
}

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  var expiration = new Date(today);
  expirationDate.setDate(today.getDate() + 30);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'AskmeaboutmyWEINER');
};

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

UsersSchema.post('validatePassword', function(next) {
  this.lastLogin = Date.now();
  next();
});

var User = db.model('User', UsersSchema);

module.exports = User;
