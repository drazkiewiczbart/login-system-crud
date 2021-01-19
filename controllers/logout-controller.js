'use strict'

// Logout / Get controller
const logoutController = (req, res) => {
  req.logout();
  req.flash('success', 'Logout success');
  res.redirect('/');
}

module.exports = logoutController;