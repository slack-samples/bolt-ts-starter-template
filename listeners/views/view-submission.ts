import type { AllMiddlewareArgs, SlackViewMiddlewareArgs, ViewSubmitAction } from '@slack/bolt';
import { sample_item_entity } from '../../sample-metadata';


const viewSubmissionCallback = async ({ ack, view, body, client, logger }: AllMiddlewareArgs & SlackViewMiddlewareArgs<ViewSubmitAction>) => {
  await ack();

  // TODO: Inspect changes to the entity, persist changes to your datastore, and respond to Slack with the updated metadata
  console.log(view.state.values);

  try {
    await client.entity.presentDetails({
      metadata: sample_item_entity,
      trigger_id: body.trigger_id,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default viewSubmissionCallback;
