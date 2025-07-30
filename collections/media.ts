import type { CollectionConfig } from 'payload';

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
  folders: true,
  admin: {
    defaultColumns: ['id', 'filename', 'alt', 'mimeType', 'filesizeInMb'],
    useAsTitle: 'filename',
    hideAPIURL: process.env.NODE_ENV === 'production',
    group: 'Media',
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
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            // siblingData contains the other fields of the current document
            if (siblingData && typeof siblingData.filesize === 'number') {
              const filesizeInBytes = siblingData.filesize;
              const filesizeInKb = filesizeInBytes / 1024;
              const filesizeInMb = filesizeInBytes / (1024 * 1024);
              return filesizeInKb < 512
                ? `${(filesizeInKb).toFixed(2)} Kb`
                : `${filesizeInMb.toFixed(2)} Mb`;
            }
            return;
          },
        ],
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
