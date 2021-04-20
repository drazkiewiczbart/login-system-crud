const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { passwordValidation } = require('./password-validation');

passport.serializeUser((doc, done) => {
  const userId = doc._id;
  done(null, userId);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const doc = await User.findById(_id).exec();
    done(null, doc);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  'local-authentication',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const normalizeEmail = email.toLowerCase();
        const doc = await User.findOne({
          emailAddress: normalizeEmail,
        }).exec();

        if (!doc) {
          return done(null, false);
        }

        if (!(await passwordValidation(doc, password))) {
          return done(null, false);
        }

        return done(null, doc);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
