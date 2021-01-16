'use strict'

/*
* Logout / Get controller
*/
const logoutController = (req, res) => {
  req.logout();
  res.redirect('login');
}

module.exports = logoutController;