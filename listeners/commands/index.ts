import { App } from '@slack/bolt';
import sampleCommandCallback from './sample-command';

const register = (app: App) => {
  app.command('/sample-command', sampleCommandCallback);
};

export default { register };
