const mongoose = require('mongoose');
const user = mongoose.model('users');
const moment = require('moment');

const userProfilePage = async (req, res) => {
  try {
    const dataFormat = 'YYYY-MM-DD HH:mm:ss';
    const doc = await user.findById(req.user).exec();
    const userDataFromDB = {
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
    const flashSuccessMsg = req.flash('suc').toString();
    const flashErrorMsg = req.flash('err').toString();

    res.render('profile-view', {
      userDataFromDB,
      suc: flashSuccessMsg,
      err: flashErrorMsg,
    });
  } catch (err) {
    req.flash('err', 'Sorry, we can\'t load your profile. Please try again later');
    res.redirect('/');
  }
};

module.exports = {
  userProfilePage,
};
