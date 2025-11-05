/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

export const folders: NonNullable<Config["folders"]> = {
  browseByFolder: true,
  debug: process.env.NODE_ENV === "production",
  collectionOverrides: [
    async ({ collection }) => ({
      ...collection,
      admin: {
        ...collection.admin,
        hideAPIURL: process.env.NODE_ENV === "production",
        group: { en: "Settings", es: "Ajustes" },
      },
    }),
  ],
  fieldName: "folder",
  slug: "payload-folders",
};
