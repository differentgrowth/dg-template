import type { Block } from "payload";

export const CardLinks: Block = {
  slug: "cardLinks",
  interfaceName: "CardLinksBlock",
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
            description: 'Si es URL interna, debe comenzar con "/".',
          },
        },
        {
          name: "image",
          label: { es: "Imagen", en: "Image" },
          type: "upload",
          relationTo: "media",
          required: false,
          admin: {
            description:
              "Trabajarán mejor las imagenes de colores vivos. Si no se aporta, se utilizará el logo.",
          },
        },
      ],
    },
  ],
};
