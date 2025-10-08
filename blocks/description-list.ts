import type { Block } from "payload";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const DescriptionList: Block = {
  slug: "descriptionList",
  interfaceName: "DescriptionListBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/description-list.jpg",
  labels: {
    singular: { es: "Sección en Lista", en: "Description List" },
    plural: { es: "Secciones en Lista", en: "Description Lists" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título (h2)", en: "Title (h2)" },
      type: "text",
      required: false,
    },
    {
      name: "subtitle",
      label: { es: "Subtítulo", en: "Subtitle" },
      type: "textarea",
      required: false,
      admin: {
        rows: 4,
      },
    },
    {
      name: "items",
      label: false,
      type: "array",
      labels: {
        singular: { es: "Elemento", en: "Item" },
        plural: { es: "Elementos", en: "Items" },
      },
      fields: [
        {
          name: "title",
          label: { es: "Título", en: "Title" },
          type: "text",
          required: true,
        },
        {
          name: "content",
          label: { es: "Contenido", en: "Content" },
          type: "richText",
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures],
          }),
        },
      ],
    },
  ],
};
