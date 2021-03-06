var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../server/models/users.server.model');

module.exports = function(passport) {

  //passport local authentication strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    if (email){
      email = email.toLowerCase();
    }

    //async
    process.nextTick(function() {

      Users.find({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }

        //if user not found or invalid password
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {errors: { 'email or password': 'is invalid'} });
        }

        return done(null, user);
      }).catch(done);
    });

  }));

  //passport local signup strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    if (email) {
      email = email.toLowerCase();
    }

    process.nextTick(function() {

      //check if user is already logged in
      if (!req.user) {
        console.log("User is not in session");

        Users.find({email: email}, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          }

          else {
            console.log("Creating new user");

            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.setPassword(password);
            newUser.save();
          }

        })
      }
    })
  })
  );

}

var User = require('../server/models/users.server.model.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
}
