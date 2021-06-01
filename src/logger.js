const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'bind-service' },
  transports: [],
});

module.exports = {
  logger,
};
