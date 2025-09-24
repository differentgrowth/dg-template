/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { revalidateSocialMedia } from "@/hooks/revalidate-social-media";
import { admins, anyone } from "@/lib/access";

export const SocialMedia: GlobalConfig = {
  slug: "social-media",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Redes Sociales", en: "Social Media Links" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Conectar y Compartir", en: "Connect & Share" },
  },
  hooks: {
    afterChange: [revalidateSocialMedia],
  },
  fields: [
    {
      name: "items",
      label: { es: "Redes Sociales", en: "Social Media" },
      type: "array",
      required: true,
      labels: {
        singular: { es: "Red Social", en: "Social Media" },
        plural: { es: "Redes Sociales", en: "Social Media" },
      },
      fields: [
        {
          name: "label",
          label: {
            es: "Texto a mostrar (cuando no es solo icono)",
            en: "Display text (when not icon only)",
          },
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: { es: "URL", en: "URL" },
          type: "text",
          required: true,
        },
        {
          name: "platform",
          label: { es: "Plataforma", en: "Platform" },
          type: "select",
          required: true,
          options: [
            { label: { es: "Facebook", en: "Facebook" }, value: "facebook" },
            { label: { es: "Instagram", en: "Instagram" }, value: "instagram" },
            { label: { es: "LinkedIn", en: "LinkedIn" }, value: "linkedin" },
            { label: { es: "Telegram", en: "Telegram" }, value: "telegram" },
            { label: { es: "Threads", en: "Threads" }, value: "threads" },
            { label: { es: "TikTok", en: "TikTok" }, value: "tiktok" },
            { label: { es: "WhatsApp", en: "WhatsApp" }, value: "whatsapp" },
            { label: { es: "X (Twitter)", en: "X (Twitter)" }, value: "x" },
            { label: { es: "YouTube", en: "YouTube" }, value: "youtube" },
          ],
          admin: {
            description: {
              es: "Selecciona una plataforma",
              en: "Select a platform",
            },
            position: "sidebar",
          },
        },
      ],
    },
  ],
};
