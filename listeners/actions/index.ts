import type { App } from '@slack/bolt';
import { sampleActionCallback } from './sample-action.js';

const register = (app: App) => {
  app.action('sample_action_id', sampleActionCallback);
};

export default { register };
