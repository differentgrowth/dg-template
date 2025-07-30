import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildConfig } from 'payload';

import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import sharp from 'sharp';

import { Users } from '@/collections/users';
import { autoLogin } from '@/payload-config/auto-login';
import { collections } from '@/payload-config/collections';
import { components } from '@/payload-config/components';
import { editor } from '@/payload-config/editor';
import { folders } from '@/payload-config/folders';
import { globals } from '@/payload-config/globals';
import { i18n } from '@/payload-config/i18n';
import { livePreview } from '@/payload-config/live-preview';
import { meta } from '@/payload-config/meta';
import { plugins } from '@/payload-config/plugins';
import { timezones } from '@/payload-config/timezones';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  routes: {
    api: '/admin-api',
  },
  i18n,
  admin: {
    autoLogin,
    user: Users.slug,
    livePreview,
    meta,
    dateFormat: 'LLL dd, y - HH:mm',
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    timezones,
    components,
    avatar: {
      Component: { path: '@/components/admin/account-link#AccountLink' },
    },
  },
  collections,
  globals,
  folders,
  editor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  upload: {
    safeFileNames: true,
    limits: {
      fileSize: 5_000_000, // 5MB, written in bytes
    },
  },
  plugins,
});
