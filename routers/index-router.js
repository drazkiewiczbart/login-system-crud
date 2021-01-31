const { loginUserPage, dataFormValidator } = require('../controllers/index-controller');

module.exports = (app, passport) => {
  app.get('/', loginUserPage);
  app.post('/', dataFormValidator, passport.authenticate('local-authentication', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid email address or password',
  }));
};
