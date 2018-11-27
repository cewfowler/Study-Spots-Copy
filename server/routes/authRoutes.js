var Users = require('../models/users.server.model.js'),
    passStrats = require('../../config/passport.js');
    //config = require('../../config/config'),

module.exports = function(app, passport) {

  app.post('/user/login', passport.authenticate('local-login', {
    failureFlash: true
  }), function(req, res) {

  });


  app.post('/user/register', passport.authenticate('local-signup', {
    successRedirect : '/user', // redirect to the secure profile section
    //failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash: true
  }), function(req, res) {
    console.log("here + ");
    res.status(302).send();
  });

  app.get('/user/logout' , function(req, res) {
    req.logout();
    console.log("Logging out");
    res.status(302).redirect('/');
  });

  app.get('/user', isLoggedIn, function(req, res) {
    Users.findOne({email: req.user.email}, function(err, user) {

    });
  })

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  req.flash("Please login.");
  res.redirect('/');
}
