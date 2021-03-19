const bcrypt = require('bcrypt');

const passwordValidation = async (doc, password) => {
  try {
    const passwordInDb = doc.password;
    const inputPassword = password;
    return await bcrypt.compare(inputPassword, passwordInDb);
  } catch (err) {
    return false;
  }
};

module.exports = {
  passwordValidation,
};
