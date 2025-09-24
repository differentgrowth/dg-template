import type { Block } from "payload";

export const EmbedMap: Block = {
  slug: "embedMap",
  interfaceName: "EmbedMapBlock",
  labels: {
    singular: { es: "Mapa embebido", en: "Embedded Map" },
    plural: { es: "Mapas embebidos", en: "Embedded Maps" },
  },
  fields: [
    {
      name: "title",
      type: "text",
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
  ],
};
