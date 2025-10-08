import type { Block } from "payload";

export const ContactForm: Block = {
  slug: "contactForm",
  interfaceName: "ContactFormBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/contact-form.jpg",
  labels: {
    singular: { es: "Formulario de Contacto", en: "Contact Form" },
    plural: { es: "Formularios de Contacto", en: "Contact Forms" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título (h3)", en: "Title (h3)" },
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
