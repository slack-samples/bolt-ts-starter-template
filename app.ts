import { App, LogLevel } from '@slack/bolt';
import * as dotenv from 'dotenv';
import registerListeners from './listeners';

dotenv.config();

// For dev
/*
const clientOptions = {
  slackApiUrl: 'https://dev.slack.com/api/'
};
*/

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  //clientOptions: clientOptions // TODO: remove
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    app.logger.info('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    app.logger.error('Unable to start App', error);
  }
})();
