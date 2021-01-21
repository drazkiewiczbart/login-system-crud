'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { isEmailBurner } = require('burner-email-providers');

// Get controller
const getController = (req, res) => {
  res.render('registry-view', {
    error: req.flash('error').toString()
  });
}

// Post controller
const postController = (req, res) => {
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

  newUser.save((err, user) => {
    if(err) {
      req.flash('error', 'Sorry, we can\'t create your account. Please try again later');
      res.redirect('/registry');
    } else {
      req.flash('success', 'Your account is ready to use, please login');
      res.redirect('/');
    }
  });
}

// Data validation for post controller
const isEmptyFields = (...fields) => {
  fields.forEach(field => {
    if(!field) { throw 'To create account you need set email address, password and confirm this data.'}
  });
}

const isEmailConfirm = (email, confirmEmail) => {
  if(email !== confirmEmail) { throw 'Email address are not identical.' }
}

const isPasswordConfirm = (password, confirmPassword) => {
  if(password !== confirmPassword) { throw 'Passwords are not identical.' }
}

const isEmailMatchToPattern = (email, emailRegex) => {
  if(!emailRegex.test(email)) { throw 'Incorrect email address.' }
}

const checkPasswordLength = (password) => {
  if (password.length < 10) { throw 'Password must contain ten or more characters.'}
}

const isEmailTrusted = email => {
  if (isEmailBurner(email)) { throw 'Untrusted provider, please use different email address.'}
}

// TODO: ogarnać ten fragment zeby zwracal throw
const isEmailInDB = async email => {
  try {
    const result = await user.findOne({ emailAddress: email }).exec();
    console.log(result);
    console.log(Boolean(result));
    if(result) { throw 'This email address is already used.' }
  } catch {
    Promise.reject(new Error('This email address is already used.'));
  }
}

const formDataValidation = (req, res, next) => {
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
    isEmailInDB(email);
    next();
  } catch (error) {
    req.flash('error', error);
    res.redirect('/registry');
  }
}
  // TODO: need refactor
//   if(!email || !confirmEmail || !password || !confirmPassword) {
//     req.flash('error', 'To create account you need set email address, password and confirm this data.');
//     res.redirect('/registry');
//   } else if (email !== confirmEmail) {
//     req.flash('error', 'Email address are not identical.');
//     res.redirect('/registry');
//   } else if (password !== confirmPassword) {
//     req.flash('error', 'Passwords are not identical.');
//     res.redirect('/registry');
//   } else if (!emailRegex.test(email)) {
//     req.flash('error', 'Incorrect email address.');
//     res.redirect('/registry');
//   } else if (password.length < 10) {
//     req.flash('error', 'Password must contain ten or more characters.');
//     res.redirect('/registry');
//   } else if(isEmailBurner(email)) {
//     req.flash('error', 'Untrusted provider, please use different email address.');
//     res.redirect('/registry');
//   } else {
//     user.findOne({ emailAddress: email }, (error, data) => {
//       if(error || data) {
//         req.flash('error', 'This email address is already used.');
//         res.redirect('/registry');
//       } else {
//         next();
//       }
//     });
//   }
// }

module.exports = { getController, postController, formDataValidation }