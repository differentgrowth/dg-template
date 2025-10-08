import type { Block } from "payload";

export const Comparison: Block = {
  slug: "comparison",
  interfaceName: "ComparisonBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/comparison.jpg",
  labels: {
    singular: { es: "Antes y Después", en: "Before and After" },
    plural: { es: "Antes y Después", en: "Before and After" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título", en: "Title" },
      type: "text",
      required: false,
    },
    {
      name: "description",
      label: { es: "Descripción", en: "Description" },
      type: "textarea",
      required: false,
      admin: {
        rows: 4,
      },
    },
    {
      name: "beforeImage",
      label: { es: "Imagen de antes", en: "Before image" },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: {
          in: ["image/jpeg", "image/png", "image/webp"],
        },
      },
    },
    {
      name: "afterImage",
      label: { es: "Imagen de después", en: "After image" },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: {
          in: ["image/jpeg", "image/png", "image/webp"],
        },
      },
    },
  ],
};
