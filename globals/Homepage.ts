import type { GlobalConfig } from "payload/types";

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
} from "@payloadcms/richtext-lexical";

import { CallToActionBlock } from "@/blocks/call-to-action";
import { MediaBlock } from "@/blocks/media-block";
import { anyone, authenticated } from "@/lib/access";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "hero",
      label: "Hero Section",
      type: "group",
      fields: [
        {
          name: "headline",
          type: "text",
          required: true,
        },
        {
          name: "subheadline",
          type: "textarea",
        },
        {
          name: "ctaButtonLabel",
          label: "CTA Button Label",
          type: "text",
        },
        {
          name: "ctaButtonLink",
          label: "CTA Button Link",
          type: "text",
          admin: {
            description: "e.g., /contact or https://example.com",
          },
        },
      ],
    },
    {
      name: "introduction",
      label: "Introduction Section",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              HorizontalRuleFeature(),
              CallToActionBlock,
              MediaBlock,
            ],
          }),
        },
      ],
    },
    {
      name: "featuredPostsSection",
      label: "Featured Posts Section",
      type: "group",
      fields: [
        {
          name: "featuredPostsTitle",
          label: "Title for Featured Posts Section",
          type: "text",
        },
        {
          name: "featuredPosts",
          label: "Select Posts to Feature",
          type: "relationship",
          relationTo: "posts",
          hasMany: true,
        },
      ],
    },
  ],
};
