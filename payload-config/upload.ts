import type { Config } from "payload";

export const upload: NonNullable<Config["upload"]> = {
  limits: {
    fileSize: 5_000_000, // 5 Mb
  },
};
