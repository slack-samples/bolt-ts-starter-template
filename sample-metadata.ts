import type { EntityMetadata } from '@slack/types';
import { EntityType } from '@slack/web-api';

export const APP_DOMAIN_UNFURL_URL = 'https://tmpdomain.com';

export const sample_file_entity: EntityMetadata = {
    app_unfurl_url: APP_DOMAIN_UNFURL_URL,
    entity_type: EntityType.File,
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
                type: 'slack#/types/user',
                user: { text: 'Joe Smith' }
            },
            last_modified_by: {
                type: 'slack#/types/user',
                user: { text: 'Jane Smith' }
            },
        },
    },
};

export const sample_item_entity: EntityMetadata = {
    entity_type: EntityType.Item,
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
                edit: {
                    enabled: true
                }
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
