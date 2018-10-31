var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../server/models/users.server.model.js');

module.exports = function(passport) {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    if (email){
      email = email.toLowerCase();
    }

    Users.find({email: email}, function(err, user) {

      if (!user || !user.validatePassword(password)) {
        return done(null, false, {errors: { 'email or password': 'is invalid'} });
      }

      return done(null, user);

    }).catch(done);
  }
))
}
