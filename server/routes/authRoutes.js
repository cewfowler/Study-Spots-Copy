var Users = require('../models/users.server.model.js'),
    passStrats = require('../../config/passport.js');
    //config = require('../../config/config'),

module.exports = function(app, passport) {

  app.post('/user/login', passport.authenticate('local-login', {
    successRedirect : '/#menu_toggle', // redirect to the secure profile section
    failureRedirect : '/#menu_toggle', // redirect back to the signup page if there is an error
    failureFlash: true
  }), function(req, res) {
    res.status(302).send();
  });


  app.post('/user/register', passport.authenticate('local-signup', {
    successRedirect : '/#menu_toggle', // redirect to the secure profile section
    failureRedirect : '/#menu_toggle', // redirect back to the signup page if there is an error
    failureFlash: true
  }), function(req, res) {
    /*console.log("here + " + req.isAuthenticated());
    res.status(302).redirect('/');*/
    res.status(302).send();
  });

  app.get('/user/logout', function(req, res) {
    req.logout();
    console.log("Logging out");
    res.status(302).redirect('/');
  });

  app.get('/user', isLoggedIn, function(req, res) {
/*
    console.log("Req log");
    console.log(req);
    Users.findOne({email: req.user.email.toLowerCase()}, function(err, user) {
      if (err) {
        console.log("Error finding user!");
        res.status(500).redirect('/');
      }
      */
      res.status(200).send(req.user);

      //console.log("Successful User Find");
    //});

  });

  app.put('/user', function(req, res) {
    Users.findOneAndUpdate({email: req.body.user.email.toLowerCase()},
    {upvoted :req.body.user.upvoted, downvoted: req.body.user.downvoted},
    {new : true},
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
    res.send(req.isAuthenticated());
  })

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  req.flash("Please login.");
  res.redirect('/');
}
