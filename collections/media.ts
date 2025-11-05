/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
/** biome-ignore-all lint/style/noMagicNumbers: multiple of bytes */
import type { CollectionConfig } from "payload";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { humanReadableFilesize } from "@/fields/filesize";
import { admins, anyone } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { es: "Medio", en: "Media" },
    plural: { es: "Medios", en: "Media" },
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    defaultColumns: [
      "id",
      "filename",
      "alt",
      "mimeType",
      "humanReadableFilesize",
    ],
    useAsTitle: "filename",
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Multimedia", en: "Media" },
  },
  defaultPopulate: {
    alt: true,
    url: true,
    caption: true,
    thumbnailURL: true,
    filename: true,
    mimeType: true,
    width: true,
    height: true,
    sizes: true,
    poster: true,
  },
  fields: [
    humanReadableFilesize,
    {
      name: "alt",
      type: "text",
      label: { es: "Texto alternativo", en: "Alternative text" },
    },
    {
      name: "poster",
      type: "relationship",
      relationTo: ["media"],
      label: { es: "Póster", en: "Poster" },
      hasMany: false,
      filterOptions: {
        mimeType: {
          in: ["image/jpeg", "image/png", "image/webp"],
        },
      },
      admin: {
        condition: ({ mimeType }) => mimeType.startsWith("video/"),
      },
    },
    {
      name: "caption",
      type: "richText",
      label: { es: "Pie de foto", en: "Caption" },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
        withoutEnlargement: false,
      },
    ],
  },
};
