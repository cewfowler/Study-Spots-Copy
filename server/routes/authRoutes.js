var Users = require('../models/users.server.model.js'),
    passStrats = require('../../config/passport.js');
    //config = require('../../config/config'),

module.exports = function(app, passport) {

  app.post('/user/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash: true
  }), function(req, res) {

  });


  app.post('/user/register', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash: true
  }), function(req, res) {
    /*console.log("here + " + req.isAuthenticated());
    res.status(302).redirect('/');*/
  });

  app.get('/user/logout' , function(req, res) {
    req.logout();
    console.log("Logging out");
    res.status(302).redirect('/');
  });

  app.get('/user', isLoggedIn, function(req, res) {

    Users.findOne({email: req.user.email}, function(err, user) {
      if (err) {
        console.log("Error finding user!");
        res.status(500).redirect('/');
      }
      res.status(200).send(user);
    });

  });

  app.put('/user', isLoggedIn, function(req, res) {
    Users.findOneAndUpdate({email: req.user.email.toLowerCase()}, req.user,
    function(err, userUpdated) {
        if (err) {
          console.log("Error updating");
          res.status(500).redirect('/');
        }

        console.log('New user info is ' + userUpdated);
        res.status(200).send(userUpdated);
      });

  });

  app.get('/loggedIn', function(req, res) {
    if (req.isAuthenticated()) {
      res.send(true);
    }
    else {
      res.send(false);
    }
  })

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  req.flash("Please login.");
  res.redirect('/');
}
