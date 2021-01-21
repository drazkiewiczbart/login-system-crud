'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');

// Get controller
const getController = (req, res) => {
  user.findById(req.user, (error, user) => {
    if(moment().format('YYYY-MM-DD') !== moment(user.accountDetails.lastActivityAt).format('YYYY-MM-DD')) {
      const currentTime = moment().format('YYYY-MM-DD');
      user.accountDetails.lastActivityAt = currentTime;
    }
    let firstNameLastName = '';
    if(!user.userDetails.firstName || !user.userDetails.lastName) {
        firstNameLastName = 'John Doe'
    } else if (user.userDetails.firstName && !user.userDetails.lastName) {
        firstNameLastName = `${user.userDetails.firstName} Doe`
    } else if (!user.userDetails.firstName && user.userDetails.lastName) {
        firstNameLastName = `John ${user.userDetails.lastName}`
    } else {
        firstNameLastName = `${user.userDetails.firstName} ${user.userDetails.lastName}`
    }
    res.render('profile-view', {
      firstNameLastName: firstNameLastName,
      emailAddress: user.emailAddress,
      userDetailsData: {
        aboutMe: user.userDetails.aboutMe,
        address: user.userDetails.address,
        city: user.userDetails.city,
        postCode: user.userDetails.postCode,
        country: user.userDetails.country
      },
      accountDetailsData: {
        createdAt: moment(user.accountDetails.createdAt).format('YYYY-MM-DD'),
        lastActivityAt: moment(user.accountDetails.lastActivityAt).format('YYYY-MM-DD')
      },
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
    });
  });
};

module.exports = {
  getController
}