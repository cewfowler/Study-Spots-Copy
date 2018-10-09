var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;
    //var uri;

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
