import type { Config } from "payload";
import type { Page } from "@/payload-types";

import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { revalidateRedirects } from "@/hooks/revalidate-redirects";

const vercelBlobPluginConfig = vercelBlobStorage({
  enabled: process.env.NODE_ENV === "production",
  collections: {
    media: {
      prefix: "dg-template/",
    },
  },
  token: process.env.BLOB_READ_WRITE_TOKEN,
});
export const seoPluginConfig = seoPlugin({
  collections: ["posts", "pages"],
  uploadsCollection: "media",
  generateTitle: ({ doc, collectionSlug }) =>
    `${collectionSlug === "pages" && doc.label ? doc.label : doc.title} | Different Growth`,
  generateDescription: ({ doc, collectionSlug }) => {
    if (collectionSlug === "pages") {
      const document = doc as Page;
      if (document.hero?.description) {
        return convertLexicalToPlaintext({ data: document.hero.description });
      }
      if (document?.hero?.description) {
        return convertLexicalToPlaintext({
          data: document?.hero?.description,
        });
      }
      return "";
    }

    if (collectionSlug === "posts" && doc?.description) {
      return doc.description
        ? convertLexicalToPlaintext({ data: doc.description })
        : "";
    }

    return "";
  },
  generateImage: ({ doc, collectionSlug }) => {
    if (collectionSlug === "pages") {
      return doc.hero?.image || null;
    }

    if ("image" in doc) {
      return doc.image;
    }

    return null;
  },
});

export const redirectPluginConfig = redirectsPlugin({
  collections: ["posts", "pages"],
  overrides: {
    labels: {
      singular: { es: "Redirección", en: "Redirect" },
      plural: { es: "Redirecciones", en: "Redirects" },
    },
    admin: {
      group: { en: "Settings", es: "Ajustes" },
    },
    hooks: {
      afterChange: [revalidateRedirects],
    },
    // @ts-expect-error
    fields: ({ defaultFields }) =>
      defaultFields.map((field) => {
        if ("name" in field && field.name === "from") {
          return {
            ...field,
            admin: {
              description: {
                en: "Introduce the URL of the page from which you want to redirect.",
                es: "Introduce la URL de la página desde la cual deseas redirigir.",
              },
            },
          };
        }
        return field;
      }),
  },
});

export const plugins: NonNullable<Config["plugins"]> = [
  vercelBlobPluginConfig,
  seoPluginConfig,
  redirectPluginConfig,
];
