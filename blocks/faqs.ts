import type { Block } from "payload";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Faqs: Block = {
  slug: "faqs",
  interfaceName: "FaqsBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/faqs.jpg",
  labels: {
    singular: { es: "Preguntas frecuentes", en: "FAQs" },
    plural: { es: "Preguntas frecuentes", en: "FAQs" },
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
      defaultValue: [],
      labels: {
        singular: { es: "Pregunta", en: "Question" },
        plural: { es: "Preguntas", en: "Questions" },
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          label: { es: "Pregunta", en: "Question" },
        },
        {
          name: "answer",
          type: "richText",
          required: true,
          label: { es: "Respuesta", en: "Answer" },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures],
          }),
        },
      ],
    },
  ],
};
