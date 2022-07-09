const { sampleShortcutCallback } = require('./sample-shortcut');

module.exports.register = (app) => {
  app.shortcut('sample_shortcut_id', sampleShortcutCallback);
};
