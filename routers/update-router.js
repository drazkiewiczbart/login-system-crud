'use strict'

const { isUserLogin } = require('../controllers/is-login-controller');
const { postUpdate } = require('../controllers/update-controller');

module.exports = app => {
  app.post('/update', isUserLogin, postUpdate);
};