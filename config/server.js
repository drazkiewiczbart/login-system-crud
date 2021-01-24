'use strict'

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
const localStrategy = require('passport-local').Strategy;
// Path
const path = require('path');
// Flash
const flash = require('connect-flash');
// Schedule
const schedule = require('node-schedule');
// Express
const express = require('express');
const app = express();

// App settings
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// App Use
app.use(cookieParser());
app.use(express.urlencoded({ 
  extended: false
}));
app.use(session({
  name: 'session',
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 1)
  },
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./local-authentication')(passport, localStrategy, mongoose);
app.use(express.static(path.join(__dirname, '../public')));

// Routers
require('../routers/registry-router')(app);
require('../routers/index-router')(app, passport);
require('../routers/profile-router')(app);
require('../routers/logout-router')(app);
require('../routers/update-router')(app);
require('../routers/delete-router')(app);

// Database and server
// Start and settings
mongoose.connect(dbPath, dbConfig)
.then((response) => {
  console.log(`Database connected to ${response.connection.host}`);
  try {
    app.listen(port, host, () => {
      console.log(`Node server is running on ${host}:${port}`);
    });
  } catch(error) {
    console.error('Node server has a problem');
    console.error(error);
  }
}).catch((error) => {
  console.error('Database has problem with connection. Node server is down')
  console.error(error);
});

schedule.scheduleJob('59 23 * * *', () => {
  const collectionsToDrop = ['users', 'sessions'];

  for (const collection of collectionsToDrop) {
    if(mongoose.connection.collection(collection).length > 0) {
        mongoose.connection.dropCollection(collection)
        .then(() => {
          console.log(`Drop ${collection} collection success`);
        })
        .catch(() => {
          console.error(`Sorry, can\'t drop ${collection} collection`);
        });
    };
  };
});