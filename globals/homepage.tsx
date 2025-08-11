import type { GlobalConfig } from 'payload';

import { CallToActionBlock } from '@/blocks/call-to-action';
import { ColumnSection } from '@/blocks/column-section';
import { ContactFormBlock } from '@/blocks/contact-form';
import { MediaBlock } from '@/blocks/media';
import { SectionBlock } from '@/blocks/section';
import { TwinListBlock } from '@/blocks/twin-lists';
import { hero } from '@/fields/hero';
import { revalidateHomepage } from '@/hooks/revalidate-homepage';
import { admins, anyone } from '@/lib/access';

export const HomePage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    hideAPIURL: process.env.NODE_ENV === 'production',
    group: 'Pages',
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
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
