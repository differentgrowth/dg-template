import type { Config } from 'payload';

export const folders: NonNullable<Config['folders']> = {
  browseByFolder: true,
  debug: process.env.NODE_ENV === 'production',
  collectionOverrides: [
    // biome-ignore lint/suspicious/useAwait: payloadcms convention
    async ({ collection }) => {
      return {
        ...collection,
        admin: {
          ...collection.admin,
          hideAPIURL: process.env.NODE_ENV === 'production',
          group: 'Settings',
        },
      };
    },
  ],
  fieldName: 'folder',
  slug: 'payload-folders',
};
