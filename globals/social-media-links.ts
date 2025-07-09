import type { GlobalConfig } from 'payload';

import env from '@env';

import { revalidateSocialMediaLinks } from '@/hooks/revalidate-social-media-links';
import { admins, anyone } from '@/lib/access';

export const SocialMediaLinks: GlobalConfig = {
  slug: 'social-media-links',
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    hideAPIURL: env.NODE_ENV === 'production',
  },
  hooks: {
    afterChange: [revalidateSocialMediaLinks],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: {
        components: {
          RowLabel: {
            path: '@/components/fields/array-row-label#ArrayRowLabel',
            clientProps: {
              targetField: 'platform',
            },
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Nombre',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'event',
          type: 'text',
          admin: { description: 'Analytics event' },
        },
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
          ],
          admin: {
            description: 'Select a social media platform (optional)',
            position: 'sidebar',
          },
        },
      ],
    },
  ],
};
