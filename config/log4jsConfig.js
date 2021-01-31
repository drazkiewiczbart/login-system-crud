const log4js = require('log4js');
const path = require('path');

const log4jsPattern = '[%d{yyyy-MM-ddThh:mm:ss}] [%p] %f{1} %m';
const log4jsConfig = {
  appenders: {
    all: {
      type: 'file',
      filename: path.join(__dirname, `${process.env.LOGS_DIR}all.log`),
      layout: {
        type: 'pattern',
        pattern: log4jsPattern,
      },
    },
    infoLog: {
      type: 'file',
      filename: path.join(__dirname, `${process.env.LOGS_DIR}info.log`),
      layout: {
        type: 'pattern',
        pattern: log4jsPattern,
      },
    },
    errLog: {
      type: 'file',
      filename: path.join(__dirname, `${process.env.LOGS_DIR}err.log`),
      layout: {
        type: 'pattern',
        pattern: log4jsPattern,
      },
    },
  },
  categories: {
    default: { appenders: ['all'], level: 'info' },
    infoLog: { appenders: ['infoLog'], level: 'info', enableCallStack: true },
    errLog: { appenders: ['errLog'], level: 'warn', enableCallStack: true },
  },
};

log4js.configure(log4jsConfig);

module.exports = {
  loggerInfo: log4js.getLogger('infoLog'),
  loggerErr: log4js.getLogger('errLog'),
};
