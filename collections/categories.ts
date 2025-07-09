import type { CollectionConfig } from 'payload';

import env from '@env';

import { admins, anyone } from '@/lib/access';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
    hideAPIURL: env.NODE_ENV === 'production',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
};
