import type { App } from '@slack/bolt';
import { sampleShortcutCallback } from './sample-shortcut.js';

const register = (app: App) => {
  app.shortcut('sample_shortcut_id', sampleShortcutCallback);
};

export default { register };
