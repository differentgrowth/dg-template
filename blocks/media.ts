import type { Block } from "payload";

export const Media: Block = {
  slug: "media",
  interfaceName: "MediaBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/media.jpg",
  labels: {
    singular: { es: "Medio", en: "Media" },
    plural: { es: "Medios", en: "Media" },
  },
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      label: { es: "Medio", en: "Media" },
    },
  ],
};
