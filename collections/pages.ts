/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { CallToAction } from "@/blocks/call-to-action";
import { CardLinks } from "@/blocks/card-links";
import { CardList } from "@/blocks/card-list";
import { ColumnSection } from "@/blocks/column-section";
import { Comparison } from "@/blocks/comparison";
import { ContactForm } from "@/blocks/contact-form";
import { DescriptionList } from "@/blocks/description-list";
import { EmbedMap } from "@/blocks/embed-map";
import { Faqs } from "@/blocks/faqs";
import { FeaturedPosts } from "@/blocks/featured-posts";
import { Gallery } from "@/blocks/gallery";
import { LatestPosts } from "@/blocks/latest-posts";
import { Marquee } from "@/blocks/marquee";
import { Media } from "@/blocks/media";
import { TeamSection } from "@/blocks/team-section";
import { Testimonials } from "@/blocks/testimonials";
import { hero } from "@/fields/hero";
import { slug } from "@/fields/slug";
import {
  revalidatePages,
  revalidatePagesAfterDelete,
} from "@/hooks/revalidate-pages";
import { admins, anyone } from "@/lib/access";
import { generatePreviewPath } from "@/lib/generate-preview-path";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  labels: {
    singular: {
      en: "Page",
      es: "Página",
    },
    plural: {
      en: "Pages",
      es: "Páginas",
    },
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "slug", "_status", "updatedAt"],
    hideAPIURL: process.env.NODE_ENV === "production",
    group: {
      en: "Pages",
      es: "Páginas",
    },
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
        req,
      }),
  },
  hooks: {
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesAfterDelete],
  },
  defaultSort: "updatedAt",
  timestamps: true,
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: { es: "Texto identificativo", en: "Label" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "showOnHeader",
      type: "checkbox",
      defaultValue: true,
      label: { es: "Mostrar en el encabezado", en: "Show in header" },
      admin: {
        position: "sidebar",
        components: {
          Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
        },
      },
    },
    {
      name: "showOnFooter",
      type: "checkbox",
      defaultValue: false,
      label: { es: "Mostrar en el pie de página", en: "Show in footer" },
      admin: {
        position: "sidebar",
        components: {
          Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
        },
      },
    },
    {
      ...slug({ targetField: "label" }),
    },
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "Hero", en: "Hero" },
          fields: [hero],
        },
        {
          label: { es: "Bloques", en: "Blocks" },
          fields: [
            {
              name: "blocks",
              type: "blocks",
              label: { es: "Bloques", en: "Blocks" },
              blocks: [
                CallToAction,
                CardLinks,
                CardList,
                ColumnSection,
                Comparison,
                ContactForm,
                DescriptionList,
                EmbedMap,
                Faqs,
                FeaturedPosts,
                Gallery,
                LatestPosts,
                Marquee,
                Media,
                TeamSection,
                Testimonials,
              ],
            },
          ],
        },
      ],
    },
  ],
};
