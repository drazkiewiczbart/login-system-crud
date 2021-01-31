// const { Schema } = require('mongoose');

module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      emailAddress: { type: 'string', required: true },
      password: { type: 'string', required: true },
      userDetails: {
        firstName: { type: 'string', default: null },
        lastName: { type: 'string', default: null },
        address: { type: 'string', default: null },
        city: { type: 'string', default: null },
        country: { type: 'string', default: null },
        postCode: { type: 'string', default: null },
        aboutMe: { type: 'string', default: null },
      },
      accountDetails: {
        createdAt: { type: Date, default: null, required: true },
        lastActivityAt: { type: Date, default: null },
      },
    },
    {
      versionKey: false,
    },
  );
  return mongoose.model('users', userSchema);
};
