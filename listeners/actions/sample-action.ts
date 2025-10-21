import type { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';

const sampleActionCallback = async ({
  ack,
  body,
  client,
  logger,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    await client.views.update({
      // biome-ignore lint/style/noNonNullAssertion: view may be undefined, depending on the source of this action(did it come from an action within a conversation message or a modal?). take care!
      view_id: body.view!.id,
      // biome-ignore lint/style/noNonNullAssertion: view may be undefined, depending on the source of this action(did it come from an action within a conversation message or a modal?). take care!
      hash: body.view!.hash,
      view: {
        type: 'modal',
        callback_id: 'sample_view_id',
        title: {
          type: 'plain_text',
          text: 'Updated modal title',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Nice! You updated the modal! :tada:',
            },
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated',
          },
          {
            type: 'input',
            block_id: 'input_block_id',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'sample_input_id',
              multiline: true,
            },
          },
          {
            block_id: 'select_channel_block_id',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Select a channel to message the result to',
            },
            element: {
              type: 'conversations_select',
              action_id: 'sample_dropdown_id',
              response_url_enabled: true,
            },
          },
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export { sampleActionCallback };
