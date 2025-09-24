import type { Block } from "payload";

export const FeaturedPosts: Block = {
  slug: "featuredPosts",
  interfaceName: "FeaturedPostsBlock",
  labels: {
    singular: { es: "Publicaciones destacadas", en: "Featured Posts" },
    plural: { es: "Publicaciones destacadas", en: "Featured Posts" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título (h2)", en: "Title (h2)" },
      type: "text",
      required: false,
    },
    {
      name: "subtitle",
      label: { es: "Subtítulo", en: "Subtitle" },
      type: "textarea",
      required: false,
      admin: {
        rows: 4,
      },
    },
  ],
};
