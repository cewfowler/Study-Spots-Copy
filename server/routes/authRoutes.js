var Users = require('../models/users.server.model.js'),
    passStrats = require('../../config/passport.js');
    //config = require('../../config/config'),

module.exports = function(app, passport) {

  app.post('/user/login', passport.authenticate('local-login', {
    failureFlash: true
  }), function(req, res) {

  });


  app.post('/user/register', passport.authenticate('local-signup', {
    failureFlash: true
  }), function(req, res) {

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
}
