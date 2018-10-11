var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('../config'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;
    //var uri;

//mongoose.connect(config.db.uri);

app.use('/', express.static('client'));

app.use('/*', function(req,res){
  res.redirect('/');
});

app.get('/', function(req, res) {
  res.status(200).send();
});

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
