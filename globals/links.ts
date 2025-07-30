import type { GlobalConfig } from 'payload';

import { revalidateLinks } from '@/hooks/revalidate-links';
import { admins, anyone } from '@/lib/access';

export const Links: GlobalConfig = {
  slug: 'links',
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    hideAPIURL: process.env.NODE_ENV === 'production',
    group: 'Connect & Share',
  },
  hooks: {
    afterChange: [revalidateLinks],
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
              targetField: 'label',
            },
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
