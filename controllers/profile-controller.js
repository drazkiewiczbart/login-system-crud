'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

/*
* Get controller
*/
const getController = (req, res) => {
  user.findById(req.user, (error, user) => {
    res.render('profile-view', { data: user.email});
  });
}

module.exports = {
  getController
}