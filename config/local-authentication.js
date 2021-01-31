const bcrypt = require('bcrypt');
const { loggerInfo } = require('./log4jsConfig');

const passwordValidation = async (doc, password) => {
  try {
    const userPasswordFromDB = doc.password;
    return await bcrypt.compare(password, userPasswordFromDB);
  } catch (err) {
    return false;
  }
};

module.exports = (passport, LocalStrategy, mongoose) => {
  const User = mongoose.model('users');

  passport.serializeUser((doc, done) => { done(null, doc._id); });

  passport.deserializeUser(async (_id, done) => {
    try {
      const doc = await User.findById(_id).exec();
      done(null, doc);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use('local-authentication', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const normalizeEmail = email.toLowerCase();
      const doc = await User.findOne({ emailAddress: normalizeEmail }).exec();

      if (!doc) return done(null, false);
      if (!passwordValidation(doc, password)) return done(null, false);
      loggerInfo.info(`${normalizeEmail} login into account`);
      return done(null, doc);
    } catch (err) {
      return done(err);
    }
  }));
};
