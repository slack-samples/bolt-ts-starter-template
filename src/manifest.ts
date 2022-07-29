import { DefineFunction, Manifest, Schema } from '@slack/bolt';

const ReverseFunction = DefineFunction({
  callback_id: "reverse",
  title: "Reverse",
  description: "Takes a string and reverses it",
  source_file: "functions/reverse.ts",
  input_parameters: {
    properties: {
      stringToReverse: {
        type: Schema.types.string,
        description: "The string to reverse",
      },
    },
    required: ["stringToReverse"],
  },
  output_parameters: {
    properties: {
      reverseString: {
        type: Schema.types.string,
        description: "The string in reverse",
      },
    },
    required: ["reverseString"],
  },
});

// Export your manifest as the sole export from this file
export = Manifest({
  runOnSlack: false,
  icon: 'icon.png',
  name: 'Bolt Template App',
  displayName: 'Bolt Template App',
  description: 'Reverse a string',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget neque sed nibh efficitur fermentum et nec est. Pellentesque pulvinar leo purus, sit amet aliquam libero gravida vel. Vestibulum justo augue, elementum sit amet dignissim eget, porttitor id urna. Phasellus non nibh at tortor facilisis gravida et nec ex. Suspendisse potenti.',
  botScopes: ['channels:history', 'chat:write', 'commands'],
  tokenManagementEnabled: true,
  socketModeEnabled: true,
  functions: [ReverseFunction],
  features: {
    appHome: {
      homeTabEnabled: true,
      messagesTabEnabled: false,
      messagesTabReadOnlyEnabled: false,
    },
    botUser: {
      always_online: false,
    },
    shortcuts: [{
      name: 'Run sample shortcut',
      type: 'global',
      callback_id: 'sample_shortcut_id',
      description: 'Runs a sample shortcut',
    }],
    slashCommands: [{
      command: '/sample-command',
      description: 'Runs a sample command',
      should_escape: false,
    }],
  },
  settings: {
    interactivity: {
      is_enabled: true,
    },
    org_deploy_enabled: true,
  },
  eventSubscriptions: { bot_events: ['app_home_opened', 'message.channels'] },
  tokenRotationEnabled: false,
});
