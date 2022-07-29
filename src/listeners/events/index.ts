import { App } from '@slack/bolt';
import appHomeOpenedCallback from './app-home-opened';

const register = (app: App) => {
  app.event('app_home_opened', appHomeOpenedCallback);
};

export default { register };
