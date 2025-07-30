import type { Config } from 'payload';

export const components: NonNullable<Config['admin']>['components'] = {
  graphics: {
    Icon: {
      path: '@/components/admin/mark',
      exportName: 'Mark',
    },
    Logo: {
      path: '@/components/admin/logo',
      exportName: 'Logo',
    },
  },
  logout: {
    Button: {
      path: '@/components/admin/logout-link',
      exportName: 'LogoutLink',
    },
  },
};
