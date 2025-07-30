import type { CollectionConfig } from 'payload';

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
    hideAPIURL: process.env.NODE_ENV === 'production',
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
