'use strict'

const { deleteUser } = require('../controllers/delete-controller');
const { isUserLogin } = require('../controllers/is-login-controller');

module.exports = app => {
  app.get('/delete', isUserLogin, deleteUser);
};