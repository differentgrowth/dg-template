/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { hero } from "@/fields/hero";
import { revalidateBlogPage } from "@/hooks/revalidate-blog-page";
import { admins, anyone } from "@/lib/access";

export const BlogPage: GlobalConfig = {
  slug: "blog-page",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Directorio de Blog", en: "Blog directory" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Páginas", en: "Pages" },
  },
  hooks: {
    afterChange: [revalidateBlogPage],
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
    hero,
  ],
};
