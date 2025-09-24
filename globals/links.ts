/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { revalidateSocialMedia } from "@/hooks/revalidate-social-media";
import { admins, anyone } from "@/lib/access";

export const Links: GlobalConfig = {
  slug: "links",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Enlaces", en: "Links" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Conectar y Compartir", en: "Connect & Share" },
  },
  hooks: {
    afterChange: [revalidateSocialMedia],
  },
  fields: [
    {
      name: "items",
      label: { es: "Elementos", en: "Items" },
      type: "array",
      required: true,
      labels: {
        singular: { es: "Enlace", en: "Link" },
        plural: { es: "Enlaces", en: "Links" },
      },
      fields: [
        {
          name: "label",
          label: { es: "Texto mostrado", en: "Display text" },
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
