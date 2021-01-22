'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');

const checkLastActivity = (dataFormat, user) => {
  const nowDate = moment().format(dataFormat);
  const lastUserActivity = moment(user.accountDetails.lastActivityAt).format(dataFormat);

  if(nowDate !== lastUserActivity) {
    user.accountDetails.lastActivityAt = nowDate;
    user.save();
  }
}

const setFirstNameLastName = (user) => {
  const userFirstName = user.userDetails.firstName;
  const userLastName = user.userDetails.lastName;

  if(!userFirstName && !userLastName) {
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
const getController = (req, res) => {
  user.findById(req.user, (error, user) => {
    const dataFormat = 'YYYY-MM-DD';

    checkLastActivity(dataFormat, user);

    res.render('profile-view', {
      firstNameLastName: setFirstNameLastName(user),
      emailAddress: user.emailAddress,
      userDetailsData: {
        aboutMe: user.userDetails.aboutMe,
        address: user.userDetails.address,
        city: user.userDetails.city,
        postCode: user.userDetails.postCode,
        country: user.userDetails.country
      },
      accountDetailsData: {
        createdAt: moment(user.accountDetails.createdAt).format(dataFormat),
        lastActivityAt: moment(user.accountDetails.lastActivityAt).format(dataFormat)
      },
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
    });
  });
};

module.exports = { getController };