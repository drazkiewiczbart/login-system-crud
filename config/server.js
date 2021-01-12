const path = require('path');
const { port, host, dbPath, dbConfig } = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// App


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