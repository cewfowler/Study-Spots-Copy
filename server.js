var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;


app.listen(port, function() {
  console.log('Listening on port ' + port);
})
