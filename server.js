var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;
    //var uri;

mongoose.connect(config.db.uri);

app.use('/', express.static('client'));

// api calls should be referenced using '/spots'
//app.use('/spots/', routes);
require('./server/routes/routes')(app);

app.use('/*', function(req,res){
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
