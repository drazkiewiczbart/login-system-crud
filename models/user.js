const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: 'string',
      required: true 
    },
    password: {
      type: 'string',
      required: true 
    },
    userDetails: {
      firstName: {
        type: 'string',
        default: null
      },
      lastName: {
        type: 'string',
        default: null
      }
    },
    accountDetails: {
      createdAt: {
        type: Date,
        default: null,
        required: true
      },
      lastActivityAt: {
        type: Date,
        default: null
      }
    }
  },
  {
    versionKey: false
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = {
  User: userModel
}

