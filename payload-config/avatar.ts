/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

export const avatar: NonNullable<Config["admin"]>["avatar"] = {
  Component: {
    path: "@/admin/layout/account-link#AccountLink",
  },
};
