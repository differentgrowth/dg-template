import type { Block } from "payload";

export const Gallery: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/gallery.jpg",
  labels: {
    singular: { es: "Galería", en: "Gallery" },
    plural: { es: "Galerías", en: "Galleries" },
  },
  fields: [
    {
      name: "images",
      label: { es: "Imágenes", en: "Images" },
      type: "array",
      minRows: 2,
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
