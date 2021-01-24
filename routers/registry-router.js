'use strict'

const { getRegistry, postRegistry, registryFormDataValidation } = require('../controllers/registry-controller');

module.exports = app => {
  app.get('/registry', getRegistry);
  app.post('/registry', registryFormDataValidation, postRegistry);
};