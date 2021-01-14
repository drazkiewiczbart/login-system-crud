const isLoginController = require('../controllers/is-login-controller.js');
const getController = require('../controllers/profile-controller');

module.exports = function(app) {
  app.get('/profile', isLoginController, getController);
}