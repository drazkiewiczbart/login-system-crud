const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const config = {
  name: 'session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 1,
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

module.exports = {
  sessionConfig: config,
};
