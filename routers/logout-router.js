'use strict'

const isLoginController = require('../controllers/is-login-controller');
const logoutController = require('../controllers/logout-controller');

module.exports = app => {
  app.get('/logout', isLoginController, logoutController);
}