const mongoose = require('mongoose');
const user = mongoose.model('lscrudusers');
const { logger } = require('../../libs/log4js/config');

/*
** Get method
*/
const deleteUserAccount = async (req, res) => {
  try {
    await user.deleteOne({ _id: req.user }).exec();
    req.logout();
    req.flash('suc', 'Your account was deleted successful.');
    res.redirect('/');
  } catch (err) {
    logger.error(`Problem occured when someone tried to delete account. ${err}`);
    req.flash(
      'err',
      "Sorry, we can't delete your account. Please try again later.",
    );
    res.redirect('/profile');
  }
};

module.exports = {
  deleteUserAccount,
};
