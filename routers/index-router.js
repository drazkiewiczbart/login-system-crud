'use strict'

const { getController, postController, formDataValidation } = require('../controllers/index-controller');

module.exports = (app, passport) => {
  app.get('/', getController);
  app.post('/', formDataValidation, passport.authenticate('local-authentication', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid email or password'
  }));
}