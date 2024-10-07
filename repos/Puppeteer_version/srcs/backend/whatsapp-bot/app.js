var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const pathConfig = require('./pathConfig');
var app = express();

app.use(cors());

// Configuration des vues (si vous utilisez des vues serveur)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuration des routes
const whatsappBot = require('./routes/root');
app.use("/whatsappLoginPage", whatsappBot);

const whatsappBotSession = require('./routes/session');
app.use("/whatsappLoginPage/whatsappSession", whatsappBotSession);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes principales
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestionnaire d'erreur 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestionnaire d'erreurs général
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;