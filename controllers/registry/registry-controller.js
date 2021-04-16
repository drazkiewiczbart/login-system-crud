const mongoose = require('mongoose');
const User = mongoose.model('lscrudusers');
const bcrypt = require('bcrypt');
const momentTimezone = require('moment-timezone');
const { logger } = require('../../libs/log4js/config');

/*
** Get method
*/

const getRegistryPage = (req, res) => {
  const flashErrorMsg = req.flash('err').toString();

  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('registry-view', {
      err: flashErrorMsg,
      suc: null,
    });
  }
};

const createUserObject = (normalizeEmail, hashPassword, currentTime) => {
  const newUser = new User({
    emailAddress: normalizeEmail,
    password: hashPassword,
    userDetails: {
      firstName: 'John',
      lastName: 'Doe',
    },
    accountDetails: {
      createdAt: currentTime,
    },
  });
  return newUser;
};

/*
** Post method
*/

const createNewUserAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizeEmail = email.toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);
    const currentTime = momentTimezone().tz('Europe/Berlin');
    const newUser = createUserObject(normalizeEmail, hashPassword, currentTime);
    await newUser.save();
    req.body.email = email;
    req.body.password = password;
    next();
  } catch (err) {
    logger.error(`Problem occured when someone tried to registry account. ${err}`);
    req.flash(
      'err',
      "Sorry, we can't create your account. Please try again later.",
    );
    res.redirect('/registry');
  }
};

module.exports = {
  getRegistryPage,
  createNewUserAccount,
};
