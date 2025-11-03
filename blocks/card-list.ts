import type { Block } from "payload";

export const CardList: Block = {
  slug: "cardList",
  interfaceName: "CardListBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/card-list.jpg",
  labels: {
    singular: { es: "Lista de tarjetas", en: "Card List" },
    plural: { es: "Listas de tarjetas", en: "Card Lists" },
  },
  fields: [
    {
      name: "items",
      label: false,
      type: "array",
      fields: [
        {
          name: "label",
          label: { es: "Texto", en: "Text" },
          type: "text",
          required: true,
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
