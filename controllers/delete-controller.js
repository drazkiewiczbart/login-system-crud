'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

const deleteUser = (req, res) => {
  user.deleteOne({ _id: req.user }, (error, object) => {
    if(error) {
      req.flash('error', 'Sorry, we can\'t delete your account. Please try again later');
      res.redirect('/profile');
    } else {
      req.logout();
      req.flash('success', 'Your account was deleted successful');
      res.redirect('/');
    };
  });
};

module.exports = {
  deleteUser
};