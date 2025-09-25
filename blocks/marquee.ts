import type { Block } from "payload";

export const Marquee: Block = {
  slug: "marquee",
  interfaceName: "MarqueeBlock",
  labels: {
    singular: { es: "Marquesina", en: "Marquee" },
    plural: { es: "Marquesinas", en: "Marquees" },
  },
  fields: [
    {
      name: "style",
      label: { es: "Estilo", en: "Style" },
      type: "radio",
      required: true,
      defaultValue: "Horizontal",
      options: [
        { label: { es: "Vertical", en: "Vertical" }, value: "vertical" },
        { label: { es: "Horizontal", en: "Horizontal" }, value: "horizontal" },
        { label: { es: "3D", en: "3D" }, value: "3d" },
      ],
    },
    {
      name: "images",
      label: { es: "Imágenes", en: "Images" },
      type: "array",
      minRows: 4,
      maxRows: 12,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: { es: "Imagen", en: "Image" },
          filterOptions: {
            mimeType: {
              in: ["image/jpeg", "image/png", "image/webp"],
            },
          },
        },
      ],
    },
  ],
};
