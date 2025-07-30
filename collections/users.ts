import type { CollectionConfig } from 'payload';

import { admins, anyone, checkRole } from '@/lib/access';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: anyone,
    unlock: admins,
    admin: ({ req: { user } }) => checkRole('admin', user),
  },
  auth: true,
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    hideAPIURL: process.env.NODE_ENV === 'production',
    group: 'Settings',
  },
  defaultSort: 'email',
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
  ],
};
