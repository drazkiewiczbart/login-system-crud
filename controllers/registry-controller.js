'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { isEmailBurner } = require('burner-email-providers');
const { check, validationResult } = require('express-validator');

const getRegistry = (req, res) => {
  const flashErrorMsg = req.flash('error').toString();
  if(req.user) {
    res.redirect('/profile');
  } else {
    res.render('registry-view', {
      err: flashErrorMsg
    });
  };
};

const createNewUserAccount = (req, res) => {
  const email = req.body.email;
  const normalizeEmail = email.toLowerCase()
  const password = req.body.password;
  const hashPassword = bcrypt.hashSync(password, 10);
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const newUser = new user({
    emailAddress: normalizeEmail,
    password: hashPassword,
    accountDetails: {
      createdAt: currentTime
    }
  });

  newUser.save((err, doc) => {
    if(err) {
      req.flash('error', 'Sorry, we can\'t create your account. Please try again later');
      res.redirect('/registry');
    } else {
      console.log(doc);
      req.flash('success', 'Your account is ready to use, please login');
      res.redirect('/');
    };
  });
};

const dataFormValidator = [
  check('email', 'confirmEmail', 'password', 'confirmPassword')
  .notEmpty()
  .withMessage('To create account you need insert email address, password and confirm this data'),

  check('email')
  .notEmpty()
  .withMessage('To create account you need first insert email address')
  .bail()
  .isEmail()
  .withMessage('Incorrect email address')
  .bail()
  .custom(email => !(isEmailBurner(email)))
  .withMessage('Untrusted provider, please use different email address'),

  check('confirmEmail')
  .notEmpty()
  .withMessage('You need confirm email address')
  .bail()
  .custom((confirmEmail, { req }) => confirmEmail === req.body.email)
  .withMessage('Email address are not identical'),

  check('password')
  .notEmpty()
  .withMessage('To create account you need insert password')
  .bail()
  .isLength({ min: 10 })
  .withMessage('Password must contain ten or more characters'),

  check('confirmPassword')
  .notEmpty()
  .withMessage('You need confirm password')
  .bail()
  .custom((confirmPassword, { req }) => confirmPassword === req.body.password)
  .withMessage('Passwords are not identical'),

  check('email')
  .custom(email => { 
      const normalizeEmail = email.toLowerCase();
      return user.findOne({ emailAddress: normalizeEmail })
      .then(doc => {
        if(doc) {
          return Promise.reject('This email address is already used');
        }
      });
    }
  ),

  (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
      const errorMsg = error.errors[0].msg;
      req.flash('error', errorMsg);
      res.redirect('/registry');
    } else {
      next();
    };
  }
];

module.exports = {
  getRegistry,
  createNewUserAccount,
  dataFormValidator
};