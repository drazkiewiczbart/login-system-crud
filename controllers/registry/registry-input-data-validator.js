const mongoose = require('mongoose');
const User = mongoose.model('lscrudusers');
const { check, validationResult } = require('express-validator');
const { isEmailBurner } = require('burner-email-providers');
const { logger } = require('../../libs/log4js/config');

const registryInputDataValidator = [
  check('email', 'confirmEmail', 'password', 'confirmPassword')
    .notEmpty()
    .withMessage(
      'To create account you need insert email address, password and confirm this data.',
    ),

  check('email')
    .notEmpty()
    .withMessage('To create account you need first insert email address.')
    .bail()
    .isEmail()
    .withMessage('Incorrect email address.')
    .bail()
    .custom((email) => !isEmailBurner(email))
    .withMessage('Untrusted provider, please use different email address.'),

  check('confirmEmail')
    .notEmpty()
    .withMessage('You need confirm email address.')
    .bail()
    .custom((confirmEmail, { req }) => confirmEmail === req.body.email)
    .withMessage('Email address are not identical.'),

  check('password')
    .notEmpty()
    .withMessage('To create account you need insert password.')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Password must contain ten or more characters.'),

  check('confirmPassword')
    .notEmpty()
    .withMessage('You need confirm password.')
    .bail()
    .custom((confirmPassword, { req }) => confirmPassword === req.body.password)
    .withMessage('Passwords are not identical.'),

  check('email').custom(async (email) => {
    try {
      const normalizeEmail = email.toLowerCase();
      const doc = await User.findOne({ emailAddress: normalizeEmail }).exec();
      if (doc) {
        throw new Error('This email address is already used.');
      }
    } catch (err) {
      logger.error(`Registry validation database error. ${err}`);
      throw new Error(err);
    }
    return true;
  }),

  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      const errMsg = err.errors[0].msg;
      req.flash('err', errMsg);
      res.redirect('/registry');
    } else {
      next();
    }
  },
];

module.exports = {
  registryInputDataValidator,
};
