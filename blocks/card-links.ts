import type { Block } from "payload";

export const CardLinks: Block = {
  slug: "cardLinks",
  interfaceName: "CardLinksBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/card-links.jpg",
  labels: {
    singular: { es: "Enlaces destacados", en: "Featured Links" },
    plural: { es: "Enlaces destacados", en: "Featured Links" },
  },
  fields: [
    {
      name: "links",
      label: false,
      type: "array",
      fields: [
        {
          name: "title",
          label: { es: "Título", en: "Title" },
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: { es: "Texto del botón", en: "Button text" },
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: true,
          admin: {
            description: {
              es: 'Si es URL interna, debe comenzar con "/".',
              en: 'If it is an internal URL, it must start with "/".',
            },
          },
        },
        {
          name: "image",
          label: { es: "Imagen", en: "Image" },
          type: "upload",
          relationTo: "media",
          required: false,
          admin: {
            description: {
              es: "Trabajarán mejor las imágenes de colores vivos. Si no se aporta, se utilizará el logo.",
              en: "Images with vivid colors will work better. If not provided, the logo will be used.",
            },
          },
        },
      ],
    },
  ],
};
