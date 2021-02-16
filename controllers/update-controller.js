const mongoose = require('mongoose');
const user = mongoose.model('users');
const { loggerInfo } = require('../config/log4jsConfig');

const updateUserProfile = async (req, res) => {
  try {
    const doc = await user.findById(req.user).exec();
    const formDataInformation = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      aboutMe: req.body.aboutMe,
      address: req.body.address,
      city: req.body.city,
      postCode: req.body.postCode,
      country: req.body.country,
    };

    Object.entries(formDataInformation).forEach((property) => {
      const [key, value] = property;
      if (value) doc.userDetails[key] = value;
    });

    await doc.save();
    loggerInfo.info(`${doc.emailAddress} updated data in account.`);
    req.flash('suc', 'Update data successful.');
  } catch (err) {
    loggerInfo.error(`Someone tried update data in account. (${err}).`);
    req.flash(
      'err',
      "Sorry, we can't update your account. Please try again later.",
    );
  } finally {
    res.redirect('/profile');
  }
};

module.exports = {
  updateUserProfile,
};
