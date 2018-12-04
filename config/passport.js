var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../server/models/users.server.model');


module.exports = function(passport) {
/*
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });*/

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //passport local authentication strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    if (req.isAuthenticated()) {
      console.log("Already logged in");
      return done(null, false);
    }

    if (email) {
      email = email.toLowerCase();
    }

    //async
    process.nextTick(function() {

      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }

        //if user not found or invalid password
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {errors: { 'email or password': 'is invalid'} });
        }
        console.log("Correct user and password");

        User.findOneAndUpdate({email: email}, {$set: {lastLogin: Date.now()}}, {new: true}, function(err, newU) {
          console.log(newU);
        });
        return done(null, user);
      })
    });

  }));

  //passport local signup strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {

    if (req.isAuthenticated()) {
      console.log("Already logged in");
      return done(null, false);
    }

    if (email) {
      email = email.toLowerCase();
    }

    process.nextTick(function() {

      //check if user is already logged in
      if (!req.user) {
        console.log("User is not in session");

        User.findOne({email: email}, function(err, user) {
          if (err) {
            return done(err);
          }

          else if (user) {
            console.log("Found user");
            return done(null, false, req.flash('signupError', 'That email is already taken.'));
          }

          else {
            console.log("Creating new user");

            var newUser = new User();
            newUser.email = email;
            newUser.setPassword(password);
            console.log(newUser.password);
            User.findOneAndUpdate({"email": newUser.email}, newUser, {upsert: true, new: true}, function(err, newU) {
              console.log(newU);
            });
            return done(null, true);
          }

        });

      }
    })
  })
  );

}
