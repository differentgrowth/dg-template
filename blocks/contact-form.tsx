import type { Block } from 'payload';

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        rows: 4,
      },
    },
    {
      name: 'nameLabel',
      type: 'text',
      required: true,
      defaultValue: 'Nombre',
    },
    {
      name: 'emailLabel',
      type: 'text',
      required: true,
      defaultValue: 'Email',
    },
    {
      name: 'websiteLabel',
      type: 'text',
    },
    {
      name: 'agencyLabel',
      type: 'text',
    },
    {
      name: 'messageLabel',
      type: 'text',
      required: true,
      defaultValue: 'Mensaje',
    },
  ],
};
