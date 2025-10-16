import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { sample_file_entity } from '../../sample-metadata';


const linkSharedCallback = async ({
    client,
    event,
    logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'link_shared'>) => {
    try {
        await client.chat.unfurl({
            channel: event.channel,
            ts: event.message_ts,
            metadata: { entities: [sample_file_entity] }
        });
    } catch (error) {
        logger.error(error);
    }
};

export default linkSharedCallback;
