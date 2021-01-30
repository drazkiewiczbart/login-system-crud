'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

const deleteUser = (req, res) => {
  user.deleteOne({ _id: req.user }).exec()
  .then(_ => {
    req.logout();
    req.flash('success', 'Your account was deleted successful');
    res.redirect('/');
  })
  .catch(_ => {
    req.flash('err', 'Sorry, we can\'t delete your account. Please try again later');
    res.redirect('/profile');
  });
};

module.exports = {
  deleteUser
};