import type { Field } from "payload";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "title",
      label: { es: "Título (h1)", en: "Title (h1)" },
      type: "text",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { es: "Imagen", en: "Image" },
    },
    {
      name: "description",
      label: { es: "Descripción", en: "Description" },
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
        { value: "high", label: { es: "Alto", en: "High" } },
        { value: "low", label: { es: "Bajo", en: "Low" } },
      ],
      defaultValue: "high",
      label: { es: "Impacto", en: "Impact" },
    },
    {
      name: "enablePrimaryLink",
      type: "checkbox",
      defaultValue: false,
      label: { es: "Habilitar enlace primario", en: "Enable primary link" },
    },
    {
      name: "primaryLink",
      label: { es: "Enlace primario", en: "Primary link" },
      type: "group",
      required: false,
      fields: [
        {
          name: "label",
          label: { es: "Texto del enlace", en: "Link text" },
          type: "text",
        },
        {
          name: "path",
          label: { es: "Ruta del enlace", en: "Link path" },
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
      label: { es: "Habilitar enlace secundario", en: "Enable secondary link" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "secondaryLink",
      label: { es: "Enlace secundario", en: "Secondary link" },
      type: "group",
      required: false,
      fields: [
        {
          name: "label",
          label: { es: "Texto del enlace", en: "Link text" },
          type: "text",
        },
        {
          name: "path",
          label: { es: "Ruta del enlace", en: "Link path" },
          type: "text",
        },
      ],
      admin: {
        condition: (_, { enableSecondaryLink }) => enableSecondaryLink,
      },
    },
  ],
};
