'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { isEmailBurner } = require('burner-email-providers');

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

const isEmptyFields = (...fields) => {
  fields.forEach(field => {
    if(!field) { throw 'To create account you need insert email address, password and confirm this data'};
  });
};

const isEmailConfirm = (email, confirmEmail) => {
  if(email !== confirmEmail) { throw 'Email address are not identical' };
};

const isPasswordConfirm = (password, confirmPassword) => {
  if(password !== confirmPassword) { throw 'Passwords are not identical' };
};

const isEmailMatchToPattern = (email, emailRegex) => {
  if(!emailRegex.test(email)) { throw 'Incorrect email address' };
};

const checkPasswordLength = password => {
  if (password.length < 10) { throw 'Password must contain ten or more characters'};
};

const isEmailTrusted = email => {
  if (isEmailBurner(email)) { throw 'Untrusted provider, please use different email address'};
};

const registryFormDataValidation = (req, res, next) => {
  const email = req.body.email;
  const confirmEmail = req.body.confirmEmail;
  const emailRegex = /\w+@{1}\w+.{1}\w+/;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    isEmptyFields(email, confirmEmail, password, confirmPassword);
    isEmailConfirm(email, confirmEmail);
    isPasswordConfirm(password, confirmPassword);
    isEmailMatchToPattern(email, emailRegex);
    checkPasswordLength(password);
    isEmailTrusted(email);
    user.findOne({ emailAddress: email }, (error, object) => {
      if(error) {
        req.flash('error', 'Sorry, we can\'t check your email address in out database. Please try again later');
        res.redirect('/registry');
      } else if(object) { 
        req.flash('error', 'This email address is already used');
        res.redirect('/registry');
      } else {
        next();
      };
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/registry');
  };
};

module.exports = {
  getRegistry,
  postRegistry,
  registryFormDataValidation
};