const { port, host, dbPath, dbConfig, sessionSecret } = require('./config');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// App
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
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
}))

app.use(require('../routers/registry'));


// Database and server
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