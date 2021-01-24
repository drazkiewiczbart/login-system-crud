'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');

const checkLastUserActivity = (dataFormat, object) => {
  const nowDate = moment().format(dataFormat);
  const lastUserActivityDate = moment(object.accountDetails.lastActivityAt).format(dataFormat);

  if(nowDate !== lastUserActivityDate) {
    object.accountDetails.lastActivityAt = nowDate;
    object.save((error, object) => {
      if(error) {
        throw 'Sorry, we can\'t load your profile. Please try again later';
      };
    });
  };
};

const setFirstNameLastName = object => {
  const userFirstName = object.userDetails.firstName;
  const userLastName = object.userDetails.lastName;

  if(!userFirstName && !userLastName) {
      return 'John Doe'
  } else if (userFirstName && !userLastName) {
      return `${userFirstName} Doe`
  } else if (!userFirstName && userLastName) {
      return `John ${userLastName}`
  } else {
      return `${userFirstName} ${userLastName}`
  };
};

const getProfile = (req, res) => {
  user.findById(req.user, (error, object) => {
    if(error) {
      req.flash('error', 'Sorry, we can\'t load your profile. Please try again later');
      res.redirect('/');
    } else {
      const dataFormat = 'YYYY-MM-DD';
  
      try {
        checkLastUserActivity(dataFormat, object);
      } catch (error) {
        req.flash('error', error);
        res.redirect('/');
      };
  
      res.render('profile-view', {
        firstNameLastName: setFirstNameLastName(object),
        emailAddress: object.emailAddress,
        userDetailsData: {
          aboutMe: object.userDetails.aboutMe,
          address: object.userDetails.address,
          city: object.userDetails.city,
          postCode: object.userDetails.postCode,
          country: object.userDetails.country
        },
        accountDetailsData: {
          createdAt: moment(object.accountDetails.createdAt).format(dataFormat),
          lastActivityAt: moment(object.accountDetails.lastActivityAt).format(dataFormat)
        },
          error: req.flash('error').toString(),
          success: req.flash('success').toString()
      });
    };
  });
};

module.exports = {
  getProfile
};