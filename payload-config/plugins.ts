import type { Config } from 'payload';

import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { revalidateRedirects } from '@/hooks/revalidate-redirects';

const vercelBlobPluginConfig = vercelBlobStorage({
  collections:
    process.env.NODE_ENV === 'production'
      ? {
          media: {
            prefix: 'payload-template/',
          },
        }
      : {},
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

export const seoPluginConfig = seoPlugin({
  collections: ['posts', 'services', 'guides'],
  uploadsCollection: 'media',
  generateTitle: ({ doc }) => `${doc.title} | Different Growth`,
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
    admin: {
      group: 'Settings',
    },
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
