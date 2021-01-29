'use strict'

const { getRegistry, postRegistry, validatorExpress } = require('../controllers/registry-controller');

module.exports = app => {
  app.get('/registry', getRegistry);
  app.post('/registry', validatorExpress, postRegistry);
};