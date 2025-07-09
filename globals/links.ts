import type { GlobalConfig } from 'payload';

import env from '@env';

import { revalidateLinks } from '@/hooks/revalidate-links';
import { admins, anyone } from '@/lib/access';

export const Links: GlobalConfig = {
  slug: 'links',
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    hideAPIURL: env.NODE_ENV === 'production',
  },
  hooks: {
    afterChange: [revalidateLinks],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
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
      ],
    },
  ],
};
