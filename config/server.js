const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
require('../models/user-model')(mongoose);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const flash = require('connect-flash');
const express = require('express');
const app = express();
const { port, host, dbPath, dbConfig, sessionSecret } = require('./config');
const { loggerInfo } = require('./log4jsConfig');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(
  session({
    name: 'session',
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 1),
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./local-authentication')(passport, LocalStrategy, mongoose);
app.use(express.static(path.join(__dirname, '../public')));

require('../routers/registry-router')(app, passport);
require('../routers/index-router')(app, passport);
require('../routers/profile-router')(app);
require('../routers/logout-router')(app);
require('../routers/update-router')(app);
require('../routers/delete-router')(app);
require('../routers/404-router')(app);

(async () => {
  try {
    await mongoose.connect(dbPath, dbConfig);
    loggerInfo.info('Start: database connected.');
    app.listen(port, host);
    loggerInfo.info(`Start: node server is running on ${host}:${port}.`);
  } catch (err) {
    loggerInfo.fatal(
      `Start: database or server problem. Server not run. (${err}).`,
    );
  }
})();

mongoose.connection.on('disconnected', () => {
  loggerInfo.error('Database disconnected.');
});

mongoose.connection.on('reconnected', () => {
  loggerInfo.info('Database reconnected.');
});

mongoose.connection.on('error', (err) => {
  loggerInfo.fatal(`Database error. ${err}.`);
});
