import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { sample_item_entity } from '../../sample-metadata';


const entityDetailsRequestedCallback = async ({
    client,
    event,
    logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'entity_details_requested'>) => {
    try {
        await client.entity.presentDetails({
            metadata: sample_item_entity,
            trigger_id: event.trigger_id,
        });
    } catch (error) {
        logger.error(error);
    }
};

export default entityDetailsRequestedCallback;
