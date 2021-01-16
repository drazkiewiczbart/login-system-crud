'use strict'

/*
* Get controller
*/
const getController = (req, res) => {
  res.render('login-view', {
    error: req.flash('error').toString(),
    success: req.flash('success').toString()
  });
}

/*
* Post controller
*/
const postController = (req, res) => {
  res.status(200).send('login post');
}

/*
* Data validation for post controller
*/
const formDataValidation = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    req.flash('error', 'You need input your email address and password.');
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = {
  getController,
  postController,
  formDataValidation
}