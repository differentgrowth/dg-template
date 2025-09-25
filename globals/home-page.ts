/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

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
import { revalidateHomePage } from "@/hooks/revalidate-homepage";
import { admins, anyone } from "@/lib/access";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Página de inicio", en: "Homepage" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Páginas", en: "Pages" },
  },
  hooks: {
    afterChange: [revalidateHomePage],
  },
  fields: [
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
