var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

global.rootDir = config.rootDir;
global.publicDir = config.publicDir;
global.cookiesDir = config.cookiesDir;

app.use(express.static(publicDir));

const ignoredPaths = ['/favicon/1x/favicon/', '/favicon/2x/favicon/', '/sw.js', '/favicon.ico'];



// Middleware pour ignorer certaines requêtes
app.use((req, res, next) => {
  if (ignoredPaths.includes(req.path)) {
    return res.status(204).send()
  }
  next();
});

const bot = require('./routes/homeRoutes');
app.use("/bot", bot);


const testBot = require('./routes/testBot');
const {rootDir} = require("./config");
app.use("/testBot", testBot);


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
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
