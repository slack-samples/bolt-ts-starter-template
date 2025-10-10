import type { App } from '@slack/bolt';
import appHomeOpenedCallback from './app-home-opened';
import entityDetailsRequestedCallback from './entity-details-requested';
import linkSharedCallback from './link-shared';

const register = (app: App) => {
  app.event('app_home_opened', appHomeOpenedCallback);
  app.event('link_shared', linkSharedCallback);
  app.event('entity_details_requested', entityDetailsRequestedCallback);
};

export default { register };
