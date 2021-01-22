'use strict'

// Logout / Get controller
const logoutController = (req, res) => {
  req.logout();
  req.flash('success', 'Logout successful');
  res.redirect('/');
}

module.exports = { logoutController };