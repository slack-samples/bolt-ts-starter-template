import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import type { EntityMetadata } from '@slack/types';

const APP_DOMAIN_UNFURL_URL = 'https://tmpdomain.com';

const sample_file_entity: EntityMetadata = {
    app_unfurl_url: APP_DOMAIN_UNFURL_URL,
    entity_type: 'slack#/entities/file',
    external_ref: {
        id: 'F012345678',
    },
    url: APP_DOMAIN_UNFURL_URL,
    entity_payload: {
        attributes: {
            title: {
                text: 'Hello World',
            },
            product_name: 'My Product',
        },
        slack_file: {
            id: 'F012345678',
            type: 'png',
        },
        fields: {
            preview: {
                alt_text: 'My File',
                slack_file: {
                    id: 'F012345678',
                },
            },
            created_by: {
                value: 'Joe Smith',
                type: 'string',
            },
            last_modified_by: {
                value: 'Joe Smith',
                type: 'string',
            },
        },
    },
};

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
