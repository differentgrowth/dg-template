/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { CallToAction } from "@/blocks/call-to-action";
import { Media } from "@/blocks/media";
import { slug } from "@/fields/slug";
import {
  revalidateFeaturedPosts,
  revalidateFeaturedPostsAfterDelete,
  revalidatePosts,
  revalidatePostsAfterDelete,
} from "@/hooks/revalidate-posts";
import { admins, anyone } from "@/lib/access";
import { generatePreviewPath } from "@/lib/generate-preview-path";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: { es: "Publicación", en: "Post" },
    plural: { es: "Publicaciones", en: "Posts" },
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "id",
      "title",
      "slug",
      "_status",
      "publishedAt",
      "updatedAt",
    ],
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "SEO", en: "SEO" },
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "posts",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "posts",
        req,
      }),
  },
  trash: true,
  defaultPopulate: {
    image: true,
    title: true,
    description: true,
    categories: true,
    slug: true,
    publishedAt: true,
    authors: true,
  },
  hooks: {
    afterChange: [revalidatePosts, revalidateFeaturedPosts],
    afterDelete: [
      revalidatePostsAfterDelete,
      revalidateFeaturedPostsAfterDelete,
    ],
  },
  timestamps: true,
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  defaultSort: "-publishedAt",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { es: "Título", en: "Title" },
    },
    {
      name: "description",
      type: "richText",
      label: { es: "Descripción", en: "Description" },
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: false,
      label: { es: "Imagen", en: "Image" },
      filterOptions: {
        mimeType: {
          in: ["image/jpeg", "image/png", "image/webp"],
        },
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: { es: "Programado el:", en: "Scheduled on:" },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      label: { es: "Autores", en: "Authors" },
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
    },
    {
      name: "featured",
      type: "checkbox",
      label: { es: "Destacado", en: "Featured" },
      defaultValue: false,
      admin: {
        position: "sidebar",
        components: {
          Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
        },
      },
    },
    {
      ...slug({ targetField: "title" }),
    },
    {
      name: "categories",
      type: "relationship",
      label: { es: "Categorías", en: "Categories" },
      hasMany: true,
      relationTo: "categories",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      label: { es: "Posts relacionados", en: "Related posts" },
      admin: {
        position: "sidebar",
      },
      filterOptions: ({ id }) => ({
        id: {
          not_in: id ? [id] : [],
        },
      }),
    },
    {
      name: "content",
      type: "richText",
      label: { es: "Contenido", en: "Content" },
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BlocksFeature({
            blocks: [CallToAction, Media],
          }),
        ],
      }),
    },
  ],
};
