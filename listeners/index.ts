import type { App } from '@slack/bolt';

import actions from './actions/index.js';
import commands from './commands/index.js';
import events from './events/index.js';
import messages from './messages/index.js';
import shortcuts from './shortcuts/index.js';
import views from './views/index.js';

const registerListeners = (app: App) => {
  actions.register(app);
  commands.register(app);
  events.register(app);
  messages.register(app);
  shortcuts.register(app);
  views.register(app);
};

export default registerListeners;
