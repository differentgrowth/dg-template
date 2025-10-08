import type { Block } from "payload";

export const EmbedMap: Block = {
  slug: "embedMap",
  interfaceName: "EmbedMapBlock",
  imageURL: "https://www.differentgrowth.com/admin-api/thumbnails/file/map.jpg",
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
    {
      name: "googleMapsEmbedCode",
      type: "text",
      label: {
        es: "Código embebido Google Maps",
        en: "Embed Code of Google Maps",
      },
    },
    {
      name: "googleMapsUrl",
      type: "text",
      label: { es: "URL del mapa en Google Maps", en: "Google Maps URL" },
    },
    {
      name: "appleMapsUrl",
      type: "text",
      label: { es: "URL del mapa en Apple Maps", en: "Apple Maps URL" },
    },
  ],
};
