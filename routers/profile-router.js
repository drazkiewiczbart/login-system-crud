const { isUserLogin } = require('../controllers/is-login-controller');
const { userProfilePage } = require('../controllers/profile-controller');

module.exports = (app) => {
  app.get('/profile', isUserLogin, userProfilePage);
};
