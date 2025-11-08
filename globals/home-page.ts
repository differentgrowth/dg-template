/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { hero } from "@/fields/hero";
import { revalidateHomePage } from "@/hooks/revalidate-homepage";
import { admins, anyone } from "@/lib/access";
import { PageBlocks } from "@/payload-config/page-blocks";

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
          label: { es: "General", en: "General" },
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
              name: "shownIn",
              label: { es: "Mostrado en", en: "Shown in" },
              type: "select",
              hasMany: true,
              index: true,
              options: [
                { label: { en: "Header", es: "Encabezado" }, value: "header" },
                {
                  label: { en: "Footer", es: "Pie de página" },
                  value: "footer",
                },
              ],
              admin: {
                position: "sidebar",
              },
            },
          ],
        },
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
        {
          label: { es: "Datos estructurados", en: "Structured data" },
          fields: [
            {
              name: "schemaMarkup",
              type: "json",
              label: "Datos estructurados",
              required: false,
              admin: {
                description:
                  "Datos estructurados para motores de búsqueda y plataformas sociales.",
              },
            },
          ],
        },
      ],
    },
  ],
};
