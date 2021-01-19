'use strict'

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '/.env') });

// Database
const dbConfig = {
  user: process.env.DB_USER,
  pass: process.env.DB_USER_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const dbPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  dbPath,
  dbConfig,
  sessionSecret: process.env.SESSION_SECRET
}