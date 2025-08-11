import type { Config } from 'payload';

export const autoLogin: NonNullable<Config['admin']>['autoLogin'] | undefined =
  process.env.NODE_ENV === 'development'
    ? {
        email: process.env.ADMIN_EMAIL || 'iam@email.com',
        password: process.env.ADMIN_PASSWORD || 'Testing123!',
      }
    : undefined;
