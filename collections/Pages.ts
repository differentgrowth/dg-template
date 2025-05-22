import type { CollectionConfig } from "payload/types";

import {
  MetaTitleField,
  MetaDescriptionField,
  MetaImageField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { CallToActionBlock } from "@/blocks/call-to-action";
import { MediaBlock } from "@/blocks/media-block";
import { SlugGenerator } from "@/components/fields/slug-generator";
import { formatSlugHook } from "@/hooks/format-slug";
import { anyone, authenticated } from "@/lib/access";
import { generatePreviewPath } from "@/lib/generate-preview-path";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_APP_URL}${generatePreviewPath({
          collection: "pages",
          doc: data,
        })}`,
    },
    preview: ({ id }) =>
      `${process.env.NEXT_PUBLIC_APP_URL}${generatePreviewPath({
        collection: "pages",
        id,
      })}`,
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        components: {
          Field: SlugGenerator,
        },
      },
      hooks: {
        beforeValidate: [formatSlugHook("title")],
      },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          CallToActionBlock,
          MediaBlock,
        ],
      }),
    },
    {
      name: "meta",
      label: "SEO",
      type: "group",
      fields: [
        OverviewField({
          generateTitle: ({ doc }) => doc?.title,
          generateDescription: ({ doc }) =>
            doc?.meta?.description || `Description for ${doc?.title}`,
          generateImage: ({ doc }) => doc?.meta?.image,
        }),
        MetaTitleField({}),
        MetaDescriptionField({}),
        MetaImageField({
          relationTo: "media",
        }),
      ],
    },
  ],
};
