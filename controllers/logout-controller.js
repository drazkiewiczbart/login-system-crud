'use strict'

const logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'Logout successful');
  res.redirect('/');
};

module.exports = {
  logoutUser
};