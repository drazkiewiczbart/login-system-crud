const mongoose = require('mongoose');
const user = mongoose.model('users');

const deleteUser = async (req, res) => {
  try {
    await user.deleteOne({ _id: req.user }).exec();
    req.logout();
    req.flash('suc', 'Your account was deleted successful');
    res.redirect('/');
  } catch (err) {
    req.flash('err', 'Sorry, we can\'t delete your account. Please try again later');
    res.redirect('/profile');
  }
};

module.exports = {
  deleteUser,
};
