const isUserLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    req.flash('err', 'You must login before you get access to this site.');
    res.redirect('/');
  }
};

module.exports = {
  isUserLogin,
};
