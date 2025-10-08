/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
/** biome-ignore-all lint/style/noMagicNumbers: multiple of bytes */
import type { Field } from "payload";

export const humanReadableFilesize: Field = {
  name: "humanReadableFilesize",
  type: "text",
  virtual: true,
  label: { es: "Tamaño", en: "Size" },
  admin: {
    readOnly: true,
  },
  hooks: {
    afterRead: [
      ({ siblingData }) => {
        // siblingData contains the other fields of the current document
        if (siblingData && typeof siblingData.filesize === "number") {
          const filesizeInBytes = siblingData.filesize;
          const filesizeInKb = filesizeInBytes / 1024;
          const filesizeInMb = filesizeInBytes / (1024 * 1024);
          return filesizeInKb < 512
            ? `${(filesizeInKb).toFixed(2)} Kb`
            : `${filesizeInMb.toFixed(2)} Mb`;
        }
        return;
      },
    ],
  },
};
