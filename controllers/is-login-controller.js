'use strict'

const isUserLogin = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    req.flash('error', 'You must login before you get access to this site');
    res.redirect('/');
  };
};

module.exports = {
  isUserLogin
};