var mongoose = require('mongoose');

module.exports = function(app) {

  app.post('/api/addspot', function(req, res){
      console.log("Posting new study spot");
  });
}
