import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';

const sampleCommandCallback = async ({ ack, logger, respond }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    logger.error(error);
  }
};

export { sampleCommandCallback };
