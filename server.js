var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config/config'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser')
    port = process.env.PORT || 8080;
    //var uri;

//log requests to console
app.use(morgan('dev'));

//serve client
app.use('/', express.static('client'));

// api calls should be referenced using '/spots'
//app.use('/spots/', routes);
require('./server/routes/spotsRoutes')(app);

//configure passport
app.use(passport.initialize());
app.use(passport.session({
  secret: 'AskmeaboutmyWEINER',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

require('./server/routes/authRoutes')(app,passport);

app.use('/*', function(req,res){
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Listening on port ' + config.port);
});
