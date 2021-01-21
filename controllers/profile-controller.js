'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');

const checkLastActivity = (dataFormat, currentUser) => {
  const nowDate = moment().format(dataFormat);
  const lastUserActivity = moment(currentUser.accountDetails.lastActivityAt).format(dataFormat);
  if(nowDate !== lastUserActivity) {
    currentUser.accountDetails.lastActivityAt = nowDate;
    currentUser.save();
  }
}

const setFirstNameLastName = (currentUser) => {
  const userFirstName = currentUser.userDetails.firstName;
  const userLastName = currentUser.userDetails.lastName;
  if(!userFirstName || !userLastName) {
      return 'John Doe'
  } else if (userFirstName && !userLastName) {
      return `${userFirstName} Doe`
  } else if (!userFirstName && userLastName) {
      return `John ${userLastName}`
  } else {
      return `${userFirstName} ${userLastName}`
  }
}

// Get controller
const getController = async (req, res) => {
  const currentUser = await user.findById(req.user).exec();

  user.findById(req.user, (error, user) => {
    const dataFormat = 'YYYY-MM-DD';

    checkLastActivity(dataFormat, currentUser);

    res.render('profile-view', {
      firstNameLastName: setFirstNameLastName(currentUser),
      emailAddress: user.emailAddress,
      userDetailsData: {
        aboutMe: user.userDetails.aboutMe,
        address: user.userDetails.address,
        city: user.userDetails.city,
        postCode: user.userDetails.postCode,
        country: user.userDetails.country
      },
      accountDetailsData: {
        createdAt: moment(currentUser.accountDetails.createdAt).format(dataFormat),
        lastActivityAt: moment(currentUser.accountDetails.lastActivityAt).format(dataFormat)
      },
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
    });
  });
};

module.exports = {
  getController
}