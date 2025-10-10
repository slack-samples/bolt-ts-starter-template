import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import type { EntityMetadata } from '@slack/types';

const APP_DOMAIN_UNFURL_URL = 'https://tmpdomain.com';

const sample_item_entity: EntityMetadata = {
    entity_type: 'slack#/entities/item',
    external_ref: { id: '1234' },
    url: APP_DOMAIN_UNFURL_URL,
    app_unfurl_url: APP_DOMAIN_UNFURL_URL,
    entity_payload: {
        attributes: {
            title: {
                text: 'Generic type of entity',
            },
            display_type: 'Custom Type',
        },
        custom_fields: [
            {
                key: 'my-markdown-string',
                label: 'my Markdown string',
                value: '## Hello World',
                type: 'string',
                format: 'markdown',
            },
            {
                type: 'slack#/types/timestamp',
                key: 'timestamp_key',
                label: 'Timestamp',
                value: '1747496700',
                edit: {
                    enabled: true,
                },
            },
            {
                key: 'custom_img',
                label: 'image',
                type: 'slack#/types/image',
                image_url:
                    'https://previews.us-east-1.widencdn.net/preview/48045879/assets/asset-view/8588de84-f8ed-4488-a456-45ba986280ee/thumbnail/eyJ3IjoyMDQ4LCJoIjoyMDQ4LCJzY29wZSI6ImFwcCJ9?sig.ver=1&sig.keyId=us-east-1.20240821&sig.expires=1757779200&sig=dGrBibQWSfcZlEC3QcG7GHA0MBkT6kMG8HkQGo-FTww',
            },
            {
                key: 'life',
                label: 'Meaning of Life',
                value: 42,
                type: 'integer',
            },
            {
                type: 'string',
                key: 'external_select_key',
                label: 'External Select',
                value: 'Joe Smith',
                tag_color: 'gray',
                edit: {
                    enabled: true,
                    select: {
                        current_value: 'joe-smith',
                        fetch_options_dynamically: true,
                    },
                },
            },
            {
                key: 'string-array',
                label: 'String Array',
                item_type: 'string',
                type: 'array',
                value: [
                    {
                        value: 'abra',
                        type: 'string',
                    },
                    {
                        value: 'kadabra',
                        type: 'string',
                    },
                ],
            },
        ],
    },
};

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
