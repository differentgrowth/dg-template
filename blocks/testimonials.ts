import type { Block } from "payload";

export const Testimonials: Block = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
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
          admin: {
            description:
              "Pensado para ser una URL externa. Ejemplo: https://www.google.com",
          },
        },
        {
          name: "avatar",
          label: { es: "Avatar", en: "Avatar" },
          type: "text",
          required: false,
          admin: {
            description:
              "URL de la imagen del avatar. Puedes usar la URL de la imagen de la reseña.",
          },
        },
      ],
    },
  ],
};
