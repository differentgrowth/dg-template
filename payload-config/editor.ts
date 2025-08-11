import type { Config } from 'payload';

import {
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { MediaBlock } from '@/blocks/media';
import { TwinListBlock } from '@/blocks/twin-lists';

export const editor: NonNullable<Config['editor']> = lexicalEditor({
  features: ({ rootFeatures, defaultFeatures }) => {
    return [
      ...rootFeatures,
      ...defaultFeatures,
      BlocksFeature({ blocks: [MediaBlock, TwinListBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ];
  },
});
