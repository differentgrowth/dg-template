import type { Block } from "payload";

export const CardList: Block = {
  slug: "cardList",
  interfaceName: "CardListBlock",
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
            description:
              "Trabajarán mejor las imagenes de colores vivos. Si no se aporta, se utilizará el logo.",
          },
        },
      ],
    },
  ],
};
