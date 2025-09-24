import type { Block } from "payload";

export const LatestPosts: Block = {
  slug: "latestPosts",
  interfaceName: "LatestPostsBlock",
  labels: {
    singular: { es: "Últimas Publicaciones", en: "Latest Posts" },
    plural: { es: "Últimas Publicaciones", en: "Latest Posts" },
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
