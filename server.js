var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    //cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080,
    routes = require('./server/routes/routes');
    //var uri;

//mongoose.connect(config.db.uri);

app.use('/', express.static('client'));

app.get('/', function(req, res) {
  res.status(200).send();
});

// api calls should be referenced using '/spots'
app.use('/spots/', routes);

app.use('/*', function(req,res){
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
