/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { hero } from "@/fields/hero";
import { revalidateContactPage } from "@/hooks/revalidate-contact-page";
import { admins, anyone } from "@/lib/access";
import { PageBlocks } from "@/payload-config/page-blocks";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Página de contacto", en: "Contact Page" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Páginas", en: "Pages" },
  },
  hooks: {
    afterChange: [revalidateContactPage],
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
              admin: {
                initCollapsed: true,
              },
              blocks: PageBlocks,
            },
          ],
        },
      ],
    },
  ],
};
