import type { Field } from 'payload';

import { formatSlug } from '@/hooks/format-slug';

export const slug: Field = {
  name: 'slug',
  type: 'text',
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    components: {
      Field: {
        path: '@/admin-components/fields/slug-generator#SlugGenerator',
        clientProps: {
          targetField: 'label',
          readOnly: true,
        },
      },
    },
  },
  hooks: {
    beforeValidate: [formatSlug()],
  },
};
