const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { isEmailBurner } = require("burner-email-providers");
const { check, validationResult } = require("express-validator");
const { loggerInfo, loggerErr } = require("../config/log4jsConfig");

const registryUserPage = (req, res) => {
  const flashErrorMsg = req.flash("err").toString();

  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("registry-view", {
      err: flashErrorMsg,
    });
  }
};

const createUserObject = (normalizeEmail, hashPassword, currentTime) => {
  const newUser = new User({
    emailAddress: normalizeEmail,
    password: hashPassword,
    userDetails: {
      firstName: "John",
      lastName: "Doe",
    },
    accountDetails: {
      createdAt: currentTime,
    },
  });
  return newUser;
};

const createNewUserAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizeEmail = email.toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);
    const currentTime = moment();
    const newUser = createUserObject(normalizeEmail, hashPassword, currentTime);

    await newUser.save();
    loggerInfo.info(`${normalizeEmail} created account.`);
    req.flash("wlc", email);
    req.body.email = email;
    req.body.password = password;
    next();
  } catch (err) {
    loggerErr.fatal(`Someone tried create account. (${err}).`);
    req.flash(
      "err",
      "Sorry, we can't create your account. Please try again later.",
    );
    res.redirect("/registry");
  }
};

const dataFormValidator = [
  check("email", "confirmEmail", "password", "confirmPassword")
    .notEmpty()
    .withMessage(
      "To create account you need insert email address, password and confirm this data.",
    ),

  check("email")
    .notEmpty()
    .withMessage("To create account you need first insert email address.")
    .bail()
    .isEmail()
    .withMessage("Incorrect email address.")
    .bail()
    .custom((email) => !isEmailBurner(email))
    .withMessage("Untrusted provider, please use different email address."),

  check("confirmEmail")
    .notEmpty()
    .withMessage("You need confirm email address.")
    .bail()
    .custom((confirmEmail, { req }) => confirmEmail === req.body.email)
    .withMessage("Email address are not identical."),

  check("password")
    .notEmpty()
    .withMessage("To create account you need insert password.")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Password must contain ten or more characters."),

  check("confirmPassword")
    .notEmpty()
    .withMessage("You need confirm password.")
    .bail()
    .custom((confirmPassword, { req }) => confirmPassword === req.body.password)
    .withMessage("Passwords are not identical."),

  check("email").custom(async (email) => {
    try {
      const normalizeEmail = email.toLowerCase();
      const doc = await User.findOne({ emailAddress: normalizeEmail }).exec();
      if (doc) {
        throw new Error("This email address is already used.");
      }
    } catch (err) {
      loggerErr.fatal(`Validation error. (${err}).`);
      throw new Error(err);
    }
    return true;
  }),

  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      const errMsg = err.errors[0].msg;

      req.flash("err", errMsg);
      res.redirect("/registry");
    } else {
      next();
    }
  },
];

module.exports = {
  registryUserPage,
  createNewUserAccount,
  dataFormValidator,
};
