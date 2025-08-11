import type { Config } from 'payload';

import { HomePage } from '@/globals/homepage';
import { Links } from '@/globals/links';
import { SocialMediaLinks } from '@/globals/social-media-links';

export const globals: NonNullable<Config['globals']> = [
  Links,
  HomePage,
  SocialMediaLinks,
];
