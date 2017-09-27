var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var engine = require('ejs-locals');

var BNET_ID = 'tjwdytpnn8qdd546y54kb9nqczumm8aa'
var BNET_SECRET = 'pEjQsTtPWT533XnXu73AyEfVgX8tDP37'

passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "https://localhost:3000/auth/bnet/callback",
    region: "eu"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

var mount = require('./routes/mount');
var boss  = require('./routes/boss');
var pet   = require('./routes/pet');

var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mount);
app.use('/boss', boss);
app.use('/pet', pet)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
