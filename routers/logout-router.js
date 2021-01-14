const isLoginController = require('../controllers/is-login-controller.js');
const logoutController = require('../controllers/logout-controller');

module.exports = function(app) {
  app.get('/logout', isLoginController, logoutController);
}