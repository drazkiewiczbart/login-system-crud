'use strict'

const getIndex = (req, res) => {
  res.render('index-view', {
    error: req.flash('error').toString(),
    success: req.flash('success').toString()
  });
};

const indexFormDataValidation = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    req.flash('error', 'To login you need input email address and password');
    res.redirect('/');
  } else {
    next();
  };
};

module.exports = {
  getIndex,
  indexFormDataValidation
};