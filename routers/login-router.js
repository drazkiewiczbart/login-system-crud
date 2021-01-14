const { getController, postController } = require('../controllers/login-controller');

module.exports = function(app, passport) {
  app.get('/login', getController);
  app.post('/login', passport.authenticate('local-authentication', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));
}