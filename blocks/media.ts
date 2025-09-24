import type { Block } from "payload";

export const Media: Block = {
  slug: "media",
  interfaceName: "MediaBlock",
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
