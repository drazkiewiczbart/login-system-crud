const { check, validationResult } = require('express-validator');

const loginUserPage = (req, res) => {
  const flashSuccessMsg = req.flash('suc').toString();
  const flashErrorMsg = req.flash('err').toString() || req.flash('error').toString();

  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('index-view', {
      suc: flashSuccessMsg,
      err: flashErrorMsg,
    });
  }
};

const dataFormValidator = [
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
    const err = validationResult(req);

    if (!err.isEmpty()) {
      const errMsg = err.errors[0].msg;

      req.flash('err', errMsg);
      res.redirect('/');
    } else {
      next();
    }
  },
];

module.exports = {
  loginUserPage,
  dataFormValidator,
};
