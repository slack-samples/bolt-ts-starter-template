import { App } from '@slack/bolt';
import sampleMessageCallback from './sample-message';

const register = (app: App) => {
  app.message(/^(hi|hello|hey).*/, sampleMessageCallback);
};

export default { register };
