import type { Config } from 'payload';

import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { revalidateRedirects } from '@/hooks/revalidate-redirects';

const vercelBlobPluginConfig = vercelBlobStorage({
  collections: {
    media: {
      prefix: 'different-growth/',
    },
  },
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

export const seoPluginConfig = seoPlugin({
  collections: ['posts', 'pages'],
  uploadsCollection: 'media',
  generateTitle: ({ doc, collectionSlug }) =>
    `${collectionSlug === 'pages' && doc.label ? doc.label : doc.title} | Different Growth`,
  generateDescription: ({ doc }) => {
    if (!doc) {
      return '';
    }
    if ('caption' in doc) {
      return doc.caption;
    }
    return '';
  },
  generateImage: ({ doc, collectionSlug }) => {
    if (collectionSlug === 'pages') {
      return doc.hero?.image || null;
    }

    if ('image' in doc) {
      return doc.image;
    }

    return null;
  },
});

export const redirectPluginConfig = redirectsPlugin({
  collections: ['posts', 'pages'],
  overrides: {
    admin: {
      group: 'Settings',
    },
    hooks: {
      afterChange: [revalidateRedirects],
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
  },
});

export const plugins: NonNullable<Config['plugins']> = [
  vercelBlobPluginConfig,
  seoPluginConfig,
  redirectPluginConfig,
];
