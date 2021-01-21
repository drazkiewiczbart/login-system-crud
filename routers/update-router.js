'use strict'

const isLoginController = require('../controllers/is-login-controller');
const { getController, postController } = require('../controllers/update-controller');

module.exports = app => {
  app.get('/update', isLoginController, getController);
  app.post('/update', isLoginController, postController);
}