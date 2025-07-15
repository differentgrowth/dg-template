import type { Config } from 'payload';

import env from '@env';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { revalidateRedirects } from '@/hooks/revalidate-redirects';

const vercelBlobPluginConfig = vercelBlobStorage({
  collections:
    env.NODE_ENV === 'production'
      ? {
          media: {
            prefix:
              env.NODE_ENV === 'production'
                ? 'payload-templates/'
                : 'payload-template/',
          },
        }
      : {},
  token: env.BLOB_READ_WRITE_TOKEN,
});

export const seoPluginConfig = seoPlugin({
  collections: ['posts', 'services', 'guides'],
  uploadsCollection: 'media',
  generateTitle: ({ doc }) => `${doc.title} | Payload Template`,
  generateDescription: ({ doc }) => {
    if (!doc) {
      return '';
    }
    if ('caption' in doc) {
      return doc.caption;
    }
    if ('description' in doc) {
      return doc.description;
    }
    return '';
  },
  generateImage: ({ doc }) => doc.image || null,
});

export const redirectPluginConfig = redirectsPlugin({
  collections: ['posts'],
  overrides: {
    // @ts-expect-error
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'from') {
          return {
            ...field,
            admin: {
              description:
                'You will need to rebuild the website when changing this field.',
            },
          };
        }
        return field;
      });
    },
    hooks: {
      afterChange: [revalidateRedirects],
    },
  },
});

export const plugins: NonNullable<Config['plugins']> = [
  vercelBlobPluginConfig,
  seoPluginConfig,
  redirectPluginConfig,
];
