const { isUserLogin } = require('../controllers/is-login-controller');
const { updateUserProfile } = require('../controllers/update-controller');

module.exports = (app) => {
  app.post('/update', isUserLogin, updateUserProfile);
};
