import type { Block } from "payload";

import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { CallToAction } from "@/blocks/call-to-action";
import { Media } from "@/blocks/media";

export const ColumnSection: Block = {
  slug: "columnSection",
  interfaceName: "ColumnSectionBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/column-section.jpg",
  labels: {
    singular: { es: "Sección en columnas", en: "Column Section" },
    plural: { es: "Secciones en columnas", en: "Column Sections" },
  },
  fields: [
    {
      name: "hasBackground",
      type: "checkbox",
      label: { es: "Con fondo de color", en: "With background color" },
      defaultValue: false,
    },
    {
      name: "columns",
      labels: {
        singular: { es: "Columna", en: "Column" },
        plural: { es: "Columnas", en: "Columns" },
      },
      type: "array",
      defaultValue: [
        {
          size: "half",
          content: undefined,
          enableLink: false,
          link: undefined,
        },
      ],
      fields: [
        {
          name: "size",
          type: "select",
          label: { es: "Tamaño", en: "Size" },
          defaultValue: "half",
          options: [
            {
              label: { es: "Un tercio", en: "One third" },
              value: "oneThird",
            },
            {
              label: { es: "Mitad", en: "Half" },
              value: "half",
            },
            {
              label: { es: "Dos tercios", en: "Two thirds" },
              value: "twoThirds",
            },
            {
              label: { es: "Completo", en: "Full" },
              value: "full",
            },
          ],
        },
        {
          name: "content",
          type: "richText",
          label: { es: "Contenido", en: "Content" },

          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              BlocksFeature({
                blocks: [CallToAction, Media],
              }),
            ],
          }),
        },
        {
          name: "enableLink",
          type: "checkbox",
          label: { es: "Habilitar enlace", en: "Enable link" },
        },
        {
          name: "link",
          type: "group",
          label: { es: "Enlace", en: "Link" },
          admin: {
            condition: (_, { enableLink }) => enableLink,
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: { es: "Texto del enlace", en: "Link text" },
            },
            {
              name: "url",
              type: "text",
              label: { es: "URL", en: "URL" },
            },
          ],
        },
      ],
    },
  ],
};
