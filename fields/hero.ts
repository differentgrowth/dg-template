import type { Field } from "payload";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "title",
      label: "Título  (h1)",
      type: "text",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Imagen (opcional)",
    },
    {
      name: "description",
      label: "Descripción",
      type: "richText",
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
    {
      name: "impact",
      type: "radio",
      options: [
        { value: "high", label: "Alto" },
        { value: "low", label: "Bajo" },
      ],
      defaultValue: "high",
      label: "Impacto",
    },
    {
      name: "enablePrimaryLink",
      type: "checkbox",
      defaultValue: false,
      label: "Habilitar enlace primario",
    },
    {
      name: "primaryLink",
      label: "Enlace primario",
      type: "group",
      required: false,
      fields: [
        {
          name: "label",
          label: "Texto del enlace",
          type: "text",
        },
        {
          name: "path",
          label: "Ruta del enlace",
          type: "text",
        },
      ],
      admin: {
        condition: (_, { enablePrimaryLink }) => enablePrimaryLink,
      },
    },
    {
      name: "enableSecondaryLink",
      type: "checkbox",
      defaultValue: false,
      label: "Habilitar enlace secundario",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "secondaryLink",
      label: "Enlace secundario",
      type: "group",
      required: false,
      fields: [
        {
          name: "label",
          label: "Texto del enlace",
          type: "text",
        },
        {
          name: "path",
          label: "Ruta del enlace",
          type: "text",
        },
      ],
      admin: {
        condition: (_, { enableSecondaryLink }) => enableSecondaryLink,
      },
    },
  ],
};
