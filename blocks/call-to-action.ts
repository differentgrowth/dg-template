import type { Block } from 'payload';

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        rows: 4,
      },
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
        },
        {
          name: 'path',
          label: 'Path',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
};
