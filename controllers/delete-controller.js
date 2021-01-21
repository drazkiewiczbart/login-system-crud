'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

const getController = (req, res) => {
  user.deleteOne({ _id: req.user }).exec();
    req.logout();
    req.flash('success', 'Your account was deleted success');
    res.redirect('/');
}

module.exports = getController;