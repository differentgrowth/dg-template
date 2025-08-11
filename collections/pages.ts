import type { CollectionConfig } from 'payload';

import { CallToActionBlock } from '@/blocks/call-to-action';
import { ColumnSection } from '@/blocks/column-section';
import { ContactFormBlock } from '@/blocks/contact-form';
import { MediaBlock } from '@/blocks/media';
import { SectionBlock } from '@/blocks/section';
import { TwinListBlock } from '@/blocks/twin-lists';
import { hero } from '@/fields/hero';
import { slug } from '@/fields/slug';
import { autoAssignOrder } from '@/hooks/auto-assign-order';
import {
  revalidatePages,
  revalidatePagesAfterDelete,
} from '@/hooks/revalidate-pages';
import { admins, anyone } from '@/lib/access';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'order', 'updatedAt'],
    hideAPIURL: process.env.NODE_ENV === 'production',
    group: 'Pages',
  },
  hooks: {
    beforeChange: [autoAssignOrder],
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesAfterDelete],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showOnHeader',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showOnFooter',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        step: 1,
        position: 'sidebar',
      },
    },
    {
      ...slug,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          label: 'Blocks',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                CallToActionBlock,
                MediaBlock,
                ColumnSection,
                TwinListBlock,
                SectionBlock,
                ContactFormBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
