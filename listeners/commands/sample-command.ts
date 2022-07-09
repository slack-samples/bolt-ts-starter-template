import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';

const sampleCommandCallback = async ({ ack, respond }:
  AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

export default sampleCommandCallback;
