import type { CollectionConfig } from 'payload';

import env from '@env';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { admins, adminsAndUser, anyone } from '@/lib/access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
  },
  admin: {
    defaultColumns: ['id', 'filename', 'alt', 'mimeType', 'filesizeInMb'],
    useAsTitle: 'filename',
    hideAPIURL: env.NODE_ENV === 'production',
    hidden: true,
  },
  defaultPopulate: {
    alt: true,
    url: true,
    caption: true,
    thumbnailURL: true,
    filename: true,
    mimeType: true,
    width: true,
    height: true,
    sizes: true,
  },
  fields: [
    {
      name: 'filesizeInMb',
      type: 'text',
      virtual: true,
      label: 'Tamaño',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        withoutEnlargement: false,
      },
    ],
  },
};
