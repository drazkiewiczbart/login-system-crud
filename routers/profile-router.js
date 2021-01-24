'use strict'

const { isUserLogin } = require('../controllers/is-login-controller');
const { getProfile } = require('../controllers/profile-controller');

module.exports = app => {
  app.get('/profile', isUserLogin, getProfile);
};