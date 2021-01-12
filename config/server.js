const { port, host, dbPath, dbConfig, sessionSecret } = require('./config');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const express = require('express');
const app = express();

// App
app.use(express.urlencoded({ extended: false }));
// TODO: jakie jeszcze opcje są tutaj moliwe do ustawienia
app.use(session({
  secret: sessionSecret,
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