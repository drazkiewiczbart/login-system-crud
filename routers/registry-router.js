'use strict'

const { getRegistry, createNewUserAccount, dataFormValidator } = require('../controllers/registry-controller');

module.exports = app => {
  app.get('/registry', getRegistry);
  app.post('/registry', dataFormValidator, createNewUserAccount);
};