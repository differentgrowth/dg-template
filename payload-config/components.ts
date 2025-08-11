import type { Config } from 'payload';

export const components: NonNullable<Config['admin']>['components'] = {
  graphics: {
    Icon: {
      path: '@/admin-components/layout/mark',
      exportName: 'Mark',
    },
    Logo: {
      path: '@/admin-components/layout/logo',
      exportName: 'Logo',
    },
  },
  logout: {
    Button: {
      path: '@/admin-components/layout/logout-link',
      exportName: 'LogoutLink',
    },
  },
};
