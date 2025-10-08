import type { Block } from "payload";

export const TeamSection: Block = {
  slug: "teamSection",
  interfaceName: "TeamSectionBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/team.jpg",
  labels: {
    singular: { es: "Equipo", en: "Team" },
    plural: { es: "Equipos", en: "Teams" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título", en: "Title" },
      type: "text",
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
      name: "hasBackground",
      label: { es: "Tiene fondo de color", en: "Has background color" },
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "members",
      label: { es: "Miembros del equipo", en: "Team members" },
      type: "array",
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: { es: "Miembro", en: "Member" },
        plural: { es: "Miembros", en: "Members" },
      },
      defaultValue: [],
      fields: [
        {
          name: "name",
          type: "text",
          label: { es: "Nombre", en: "Name" },
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: { es: "Rol", en: "Role" },
        },
        {
          name: "bio",
          type: "textarea",
          label: { es: "Biografía", en: "Biography" },
          admin: {
            rows: 4,
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: false,
          label: { es: "Imagen", en: "Image" },
        },
      ],
    },
  ],
};
