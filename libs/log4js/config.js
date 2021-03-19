const log4js = require('log4js');
const path = require('path');

const pattern = '[%d{yyyy-MM-ddThh:mm:ss}] [%p] %f{1} %m';
const config = {
  appenders: {
    all: {
      type: 'file',
      filename: path.join(__dirname, '../../logs/logs.log'),
      layout: {
        type: 'pattern',
        pattern,
      },
    },
  },
  categories: {
    default: { appenders: ['all'], level: 'all' },
  },
};
log4js.configure(config);
const logger = log4js.getLogger('all');

module.exports = {
  logger,
};
