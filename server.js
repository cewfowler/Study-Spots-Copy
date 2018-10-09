var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;
    //var uri;

//log requests to console
app.use(morgan('dev'));

//parse html info
app.use(bodyParser.json());

//load routes and pass app
require('./routes/routes')(app);

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
