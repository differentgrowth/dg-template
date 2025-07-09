import type { Config } from 'payload';

export const meta: NonNullable<Config['admin']>['meta'] = {
  title: 'DG Admin',
  description: 'The best admin panel in the world',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
    },
  ],
};
