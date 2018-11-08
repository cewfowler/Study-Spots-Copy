var Users = require('../models/users.server.model.js'),
    passStrats = require('../../config/passport.js');
    //config = require('../../config/config'),

module.exports = function(app) {

  app.get('/user/login', passport.authenticate('local-login', {
    failureFlash: true
  }), function(req, res) {

  });


  app.post('user/register', passport.authenticate('local-signup', {
    failureFlash: true
  }), function(req, res) {

  });
}
