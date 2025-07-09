import type { Config } from 'payload';

export const autoLogin: NonNullable<Config['admin']>['autoLogin'] = {
  username: 'IAM',
  email: 'iam@email.com',
  password: 'Testing123!',
};
