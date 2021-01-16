'use strict'

const isLoginController = require('../controllers/is-login-controller');
const { getController } = require('../controllers/profile-controller');

module.exports = app => {
  app.get('/profile', isLoginController, getController);
}