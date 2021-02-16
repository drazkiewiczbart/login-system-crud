const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');
const { loggerInfo } = require('../config/log4jsConfig');

const createUserObject = (doc, dataFormat) => {
  const userObject = {
    firstName: doc.userDetails.firstName,
    lastName: doc.userDetails.lastName,
    emailAddress: doc.emailAddress,
    userDetailsData: {
      aboutMe: doc.userDetails.aboutMe,
      address: doc.userDetails.address,
      city: doc.userDetails.city,
      postCode: doc.userDetails.postCode,
      country: doc.userDetails.country,
    },
    accountDetailsData: {
      createdAt: moment(doc.accountDetails.createdAt).format(dataFormat),
      lastActivityAt: moment().format(dataFormat),
    },
  };
  return userObject;
};

const userProfilePage = async (req, res) => {
  try {
    const dataFormat = 'YYYY-MM-DD HH:mm:ss';
    const doc = await user.findById(req.user).exec();
    const userObject = createUserObject(doc, dataFormat);
    const flashSuccessMsg = req.flash('suc').toString();
    const flashErrorMsg = req.flash('err').toString();
    const flashWelcomeMsg = req.flash('wlc').toString();

    res.render('profile-view', {
      userObject,
      suc: flashSuccessMsg,
      err: flashErrorMsg,
      wlc: flashWelcomeMsg,
    });
  } catch (err) {
    loggerInfo.error(`Someone tried load profil page. (${err}).`);
    req.flash(
      'err',
      "Sorry, we can't load your profile. Please try again later.",
    );
    res.redirect('/');
  }
};

module.exports = {
  userProfilePage,
};
