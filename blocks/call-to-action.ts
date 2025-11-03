import type { Block } from "payload";

export const CallToAction: Block = {
  slug: "callToAction",
  interfaceName: "CallToActionBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/call-to-action.jpg",
  labels: {
    singular: { es: "Llamada a la acción", en: "Call to Action" },
    plural: { es: "Llamadas a la acción", en: "Calls to Action" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { es: "Título", en: "Title" },
    },
    {
      name: "description",
      type: "textarea",
      label: { es: "Descripción", en: "Description" },
      admin: {
        rows: 4,
      },
    },
    {
      name: "hasBackground",
      type: "checkbox",
      label: { es: "Con fondo de color", en: "With background color" },
      defaultValue: false,
    },
    {
      name: "button",
      type: "group",
      label: { es: "Botón", en: "Button" },
      fields: [
        {
          name: "label",
          type: "text",
          required: false,
          label: { es: "Texto del botón", en: "Button text" },
          defaultValue: "Quiero pedir cita",
        },
        {
          name: "path",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: false,
          defaultValue: "/contacto",
          admin: {
            description: {
              es: 'Puede empezar por "/" si está dentro de la web o ser una url completa (https://)',
              en: 'It can start with "/" if it is inside the web or be a complete url (https://)',
            },
          },
        },
      ],
    },
    {
      name: "enableSecondaryButton",
      type: "checkbox",
      defaultValue: false,
      label: {
        es: "Habilitar botón secundario",
        en: "Enable secondary button",
      },
    },
    {
      name: "secondaryButton",
      label: { es: "Botón secundario", en: "Secondary button" },
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: false,
          label: { es: "Texto del botón", en: "Button text" },
        },
        {
          name: "path",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: false,
        },
      ],
      admin: {
        condition: (_, { enableSecondaryButton }) => enableSecondaryButton,
      },
    },
  ],
};
