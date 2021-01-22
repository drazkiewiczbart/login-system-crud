'use strict'

const { isLoginController } = require('../controllers/is-login-controller');
const { postController } = require('../controllers/update-controller');

module.exports = app => {
  app.post('/update', isLoginController, postController);
}