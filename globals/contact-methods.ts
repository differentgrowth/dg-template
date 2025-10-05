/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { revalidateContactMethods } from "@/hooks/revalidate-contact-methods";
import { admins, anyone } from "@/lib/access";

export const ContactMethods: GlobalConfig = {
  slug: "contact-methods",
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    description: "Métodos de contacto disponibles",
    hideAPIURL: process.env.NODE_ENV === "production",
    group: "Connect & Share",
  },
  label: { es: "Métodos de contacto", en: "Contact Methods" },
  hooks: {
    afterChange: [revalidateContactMethods],
  },
  fields: [
    {
      name: "phone",
      type: "text",
      label: { es: "Teléfono", en: "Phone" },
    },
    {
      name: "whatsapp",
      type: "group",
      label: { es: "WhatsApp", en: "WhatsApp" },
      fields: [
        {
          name: "label",
          type: "text",
          label: {
            es: "Texto. (Cuando mostrado)",
            en: "Text. (When displayed)",
          },
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: { es: "Link", en: "Link" },
          required: true,
        },
        {
          name: "message",
          type: "text",
          label: { es: "Mensaje por defecto", en: "Default message" },
          required: false,
        },
      ],
    },
    {
      name: "email",
      type: "email",
      label: { es: "Email", en: "Email" },
      admin: {
        description: {
          es: "Además aquí recibirás los emails del formulario",
          en: "Additionally, you will receive emails from the form here",
        },
      },
    },
    {
      name: "address",
      type: "group",
      label: { es: "Dirección", en: "Address" },
      fields: [
        {
          name: "text",
          type: "text",
          label: { es: "Texto", en: "Text" },
        },
        {
          name: "url",
          label: {
            es: "URL de Google o Apple Maps",
            en: "URL of Google or Apple Maps",
          },
          type: "text",
        },
      ],
    },
    {
      name: "emailForNotifications",
      type: "email",
      label: { es: "Email para notificaciones", en: "Email for notifications" },
      admin: {
        description: "Además aquí recibirás los emails de notificaciones",
      },
    },
  ],
};
