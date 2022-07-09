const { appHomeOpenedCallback } = require('./app-home-opened');

module.exports.register = (app) => {
  app.event('app_home_opened', appHomeOpenedCallback);
};
