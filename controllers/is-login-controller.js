'use strict'

// Is login / Get controller
const isLoginController = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    req.flash('error', 'You must login before you get access to this site');
    res.redirect('/');
  }
}

module.exports = isLoginController;