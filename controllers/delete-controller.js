const mongoose = require('mongoose');
const user = mongoose.model('users');
const { loggerInfo } = require('../config/log4jsConfig');

const deleteUser = async (req, res) => {
  try {
    await user.deleteOne({ _id: req.user }).exec();
    loggerInfo.info('Someone delete account.');
    req.logout();
    req.flash('suc', 'Your account was deleted successful.');
    res.redirect('/');
  } catch (err) {
    loggerInfo.error(`Someone tried delete account. (${err}).`);
    req.flash(
      'err',
      "Sorry, we can't delete your account. Please try again later.",
    );
    res.redirect('/profile');
  }
};

module.exports = {
  deleteUser,
};
