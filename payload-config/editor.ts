import type { Config } from 'payload';

import {
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { MediaBlock } from '@/blocks/media-block';

export const editor: NonNullable<Config['editor']> = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      BlocksFeature({ blocks: [MediaBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ];
  },
});
