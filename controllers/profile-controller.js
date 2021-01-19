'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

// Get controller
const getController = (req, res) => {
  user.findById(req.user, (error, user) => {
    res.render('profile-view', {
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      address: user.userDetails.address,
      city: user.userDetails.city,
      country: user.userDetails.country,
      postalCode: user.userDetails.postalCode,
      aboutMe: user.userDetails.aboutMe});
  });
}

module.exports = {
  getController
}