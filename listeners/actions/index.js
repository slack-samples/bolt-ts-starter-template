const { sampleActionCallback } = require('./sample-action');

module.exports.register = (app) => {
  app.action('sample_action_id', sampleActionCallback);
};
