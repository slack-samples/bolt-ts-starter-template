import { App, LogLevel } from '@slack/bolt';
import 'dotenv/config';
import registerListeners from './listeners/index.js';

// For development purposes only
const tempDB = new Map();

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['channels:history', 'chat:write', 'commands'],
  installationStore: {
    storeInstallation: async (installation) => {
      // Org-wide installation
      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
        tempDB.set(installation.enterprise.id, installation);
        return;
      }
      // Single team installation
      if (installation.team !== undefined) {
        tempDB.set(installation.team.id, installation);
        return;
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // Org-wide installation lookup
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        return tempDB.get(installQuery.enterpriseId);
      }
      // Single team installation lookup
      if (installQuery.teamId !== undefined) {
        return tempDB.get(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      // Org-wide installation deletion
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        tempDB.delete(installQuery.enterpriseId);
        return;
      }
      // Single team installation deletion
      if (installQuery.teamId !== undefined) {
        tempDB.delete(installQuery.teamId);
        return;
      }
      throw new Error('Failed to delete installation');
    },
  },
  installerOptions: {
    // If true, /slack/install redirects installers to the Slack Authorize URL
    // without rendering the web page with "Add to Slack" button
    directInstall: false,
  },
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
