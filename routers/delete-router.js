'use strict'

const getController = require('../controllers/delete-controller');
const isLoginController = require('../controllers/is-login-controller');

module.exports = app => {
  app.get('/delete', isLoginController, getController);
}