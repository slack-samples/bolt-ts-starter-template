import type { AllMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';

const sampleViewCallback = async ({ ack, body, client, logger, view }: AllMiddlewareArgs & SlackViewMiddlewareArgs) => {
  try {
    await ack();
    const { input_block_id, select_channel_block_id } = view.state.values;
    const sampleInputValue = input_block_id.sample_input_id.value;
    const sampleConvoValue = select_channel_block_id.sample_dropdown_id.selected_conversation;

    await client.chat.postMessage({
      channel: sampleConvoValue || body.user.id,
      text: `<@${body.user.id}> submitted the following :sparkles: hopes and dreams :sparkles:: \n\n ${sampleInputValue}`,
    });
  } catch (error) {
    logger.error(error);
  }
};

export { sampleViewCallback };
