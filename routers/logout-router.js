const { isUserLogin } = require('../controllers/is-login-controller');
const { logoutUser } = require('../controllers/logout-controller');

module.exports = (app) => {
  app.get('/logout', isUserLogin, logoutUser);
};
