'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { isEmailBurner } = require('burner-email-providers');
const { check, validationResult } = require('express-validator');

const getRegistry = (req, res) => {
  if(req.user) {
    res.redirect('/profile');
  } else {
    res.render('registry-view', {
      error: req.flash('error').toString()
    });
  }
};

const postRegistry = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = bcrypt.hashSync(password, 10);
  const time = moment();

  const newUser = new user({
    emailAddress: email,
    password: hashPassword,
    accountDetails: {
      createdAt: time
    }
  });

  newUser.save((error, object) => {
    if(error) {
      req.flash('error', 'Sorry, we can\'t create your account. Please try again later');
      res.redirect('/registry');
    } else {
      req.flash('success', 'Your account is ready to use, please login');
      res.redirect('/');
    };
  });
};


const validatorExpress = [
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
  .custom((confirmEmail, {req}) => confirmEmail === req.body.email)
  .withMessage('Email address are not identical')
  .bail(),

  check('password')
  .notEmpty()
  .withMessage('To create account you need insert password')
  .bail()
  .isLength({ min: 10 })
  .withMessage('Password must contain ten or more characters')
  .bail(),

  check('confirmPassword')
  .notEmpty()
  .withMessage('You need confirm password')
  .bail()
  .custom((confirmPassword, {req}) => confirmPassword === req.body.password)
  .withMessage('Passwords are not identical')
  .bail(),

  check('email')
  .custom(async function(email) { 
    const res = await user.findOne({ emailAddress: email });
    if(res) throw new Error();
    }
  )
  .withMessage('This email address is already used'),

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
  postRegistry,
  validatorExpress
};