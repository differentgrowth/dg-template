import type { Block } from "payload";

export const Testimonials: Block = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/testimonials.jpg",
  labels: {
    singular: { es: "Testimonios", en: "Testimonials" },
    plural: { es: "Testimonios", en: "Testimonials" },
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
    {
      name: "animated",
      label: { es: "Animado", en: "Animated" },
      type: "radio",
      required: false,
      options: [
        { label: { es: "No", en: "None" }, value: "none" },
        { label: { es: "Vertical", en: "Vertical" }, value: "vertical" },
        { label: { es: "Horizontal", en: "Horizontal" }, value: "horizontal" },
      ],
      defaultValue: "none",
    },
    {
      name: "items",
      label: false,
      type: "array",
      labels: {
        singular: { es: "Testimonio", en: "Testimonial" },
        plural: { es: "Testimonios", en: "Testimonials" },
      },
      fields: [
        {
          name: "name",
          label: { es: "Nombre", en: "Name" },
          type: "text",
          required: true,
        },
        {
          name: "content",
          label: { es: "Contenido", en: "Content" },
          type: "textarea",
          required: true,
          admin: {
            rows: 4,
          },
        },
        {
          name: "url",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: false,
        },
        {
          name: "role",
          label: { es: "Rol", en: "Role" },
          type: "text",
          required: false,
        },
        {
          name: "avatar",
          label: { es: "Avatar", en: "Avatar" },
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },
  ],
};
