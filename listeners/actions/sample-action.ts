import type { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';

const sampleActionCallback = async ({
  ack,
  body,
  client,
  logger,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();

    /**
     * Return if this action somehow wasn't from a modal.
     *
     * @see {@link ../shortcuts/sample-shortcut.ts}
     * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html}
     */
    if (body.view?.type !== 'modal') {
      return;
    }

    await client.views.update({
      view_id: body.view.id,
      hash: body.view.hash,
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
