const { sampleMessageCallback } = require('./sample-message');

module.exports.register = (app) => {
  app.message(/^(hi|hello|hey).*/, sampleMessageCallback);
};
