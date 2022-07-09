const { sampleViewCallback } = require('./sample-view');

module.exports.register = (app) => {
  app.view('sample_view_id', sampleViewCallback);
};
