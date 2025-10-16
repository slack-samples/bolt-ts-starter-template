import type { App } from '@slack/bolt';
import sampleViewCallback from './sample-view';
import viewSubmissionCallback from './view-submission';

const register = (app: App) => {
  app.view('sample_view_id', sampleViewCallback);
  app.view(/^.*/, viewSubmissionCallback);
};

export default { register };
