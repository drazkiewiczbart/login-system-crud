'use strict'

/*
* Is login / Get controller
*/
const isLoginController = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = isLoginController;