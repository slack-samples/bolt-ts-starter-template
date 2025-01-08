import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';

const sampleCommandCallback = async ({ ack, respond, logger }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    logger.error(error);
  }
};

export default sampleCommandCallback;
