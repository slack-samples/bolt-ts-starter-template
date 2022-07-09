import { App } from '@slack/bolt';
import sampleViewCallback from './sample-view';

const register = (app: App) => {
  app.view('sample_view_id', sampleViewCallback);
};

export default { register };
