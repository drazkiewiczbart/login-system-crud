const mongoose = require('mongoose');
const user = mongoose.model('users');
const momentTimezone = require('moment-timezone');
const { logger } = require('../../libs/log4js/config');

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
      createdAt: momentTimezone(doc.accountDetails.createdAt).tz('Europe/Berlin').format(dataFormat),
      lastActivityAt: momentTimezone().tz('Europe/Berlin').format(dataFormat),
    },
  };
  return userObject;
};

/*
** Get method
*/

const getProfilePage = async (req, res) => {
  try {
    const dataFormat = 'YYYY-MM-DD HH:mm:ss';
    const doc = await user.findById(req.user).exec();
    const userObject = createUserObject(doc, dataFormat);
    const flashSuccessMsg = req.flash('suc').toString();
    const flashErrorMsg = req.flash('err').toString();
    res.render('profile-view', {
      userObject,
      suc: flashSuccessMsg,
      err: flashErrorMsg,
    });
  } catch (err) {
    logger.error(`Problem occured when someone tried to load profile page. ${err}`);
    req.flash(
      'err',
      "Sorry, we can't load your profile. Please try again later.",
    );
    res.redirect('/');
  }
};

module.exports = {
  getProfilePage,
};
