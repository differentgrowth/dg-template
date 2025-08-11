import type { Field } from 'payload';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'h1',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        rows: 4,
      },
    },
    {
      name: 'primaryLink',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'path',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryLink',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'path',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
};
