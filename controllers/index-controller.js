'use strict'

const { check, validationResult } = require('express-validator');

const getIndex = (req, res) => {
  if(req.user) {
    res.redirect('/profile');
  } else {
    res.render('index-view', {
      error: req.flash('error').toString(),
      success: req.flash('success').toString()
    });
  }
};

const indexFormDataValidation = [
  check('email', 'password')
  .notEmpty()
  .withMessage('To login into account you need insert email address and password'),

  check('email')
  .notEmpty()
  .withMessage('To login into account you need insert email address')
  .bail()
  .isEmail()
  .withMessage('Incorrect email address'),

  check('password')
  .notEmpty()
  .withMessage('To login into account you need insert password'),

  (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
      const errorMsg = error.errors[0].msg;
      req.flash('error', errorMsg);
      res.redirect('/');
    } else {
      next();
    }
  }
]

// const indexFormDataValidation = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   if(!email || !password) {
//     req.flash('error', 'To login you need input email address and password');
//     res.redirect('/');
//   } else {
//     next();
//   };
// };

module.exports = {
  getIndex,
  indexFormDataValidation
};