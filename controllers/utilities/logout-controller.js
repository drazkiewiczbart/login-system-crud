const logoutUser = (req, res) => {
  req.logout();
  req.flash('suc', 'Logout successful.');
  res.redirect('/');
};

module.exports = {
  logoutUser,
};
