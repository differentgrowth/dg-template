/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { sendEmailAfterLeadCreation } from "@/hooks/send-email-after-lead-creation";
import { admins, anyone } from "@/lib/access";

export const Leads: CollectionConfig = {
  slug: "leads",
  access: {
    create: anyone,
    read: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    useAsTitle: "name",
    hideAPIURL: process.env.NODE_ENV === "production",
    defaultColumns: ["name", "email", "phone", "createdAt"],
    group: "Connect & Share",
  },
  timestamps: true,
  hooks: {
    afterChange: [sendEmailAfterLeadCreation],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "phone",
      type: "text",
      label: { es: "Teléfono", en: "Phone" },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: { es: "Mensaje", en: "Message" },
      admin: {
        readOnly: true,
      },
    },
  ],
};
