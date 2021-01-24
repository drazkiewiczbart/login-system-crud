'use strict'

const { getIndex, indexFormDataValidation } = require('../controllers/index-controller');

module.exports = (app, passport) => {
  app.get('/', getIndex);
  app.post('/', indexFormDataValidation, passport.authenticate('local-authentication', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid email address or password'
  }));
};