//
// MODULES
//
// Variable
const { port, host, dbPath, dbConfig, sessionSecret } = require('./config');
// Session and parsers
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Database
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
require('../models/user-model')(mongoose);
// Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Express
const express = require('express');
const app = express();

//
// APP
//
// Settings
app.use(cookieParser());
app.use(express.urlencoded({ 
  extended: false
}));
app.use(session({
  name: 'session',
  secret: sessionSecret,
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 1)
  },
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
require('../libs/local-authentication')(passport, LocalStrategy, mongoose);

// Routers
require('../routers/registry-router')(app);
require('../routers/login-router')(app, passport);
require('../routers/profile-router')(app);

//
// DATABASE AND SERVER
//
// Start and settings
mongoose.connect(dbPath, dbConfig)
.then((response) => {
  console.log(`Database connected to ${response.connection.host}`);
  try {
    app.listen(port, host, () => {
      console.log(`Node server is running on ${host}:${port}`);
    });
  } catch(error) {
    console.log('Node server has a problem.');
    console.log(error);
  }
}).catch((error) => {
  console.log('Database has problem with connection. Node server is down.')
  console.log(error);
});

const db = mongoose.connection;
// TODO: add events handlers 'error' etc.