/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { admins, anyone } from "@/lib/access";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: { es: "Categoría", en: "Category" },
    plural: { es: "Categorías", en: "Categories" },
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: "title",
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Ajustes", en: "Settings" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { es: "Título", en: "Title" },
    },
  ],
};
