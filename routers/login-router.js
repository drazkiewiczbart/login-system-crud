'use strict'

const {
  getController,
  postController,
  formDataValidation
} = require('../controllers/login-controller');

module.exports = (app, passport) => {
  app.get('/login', getController);
  app.post('/login', formDataValidation, passport.authenticate('local-authentication', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password.'
  }));
}