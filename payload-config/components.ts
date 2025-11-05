/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

export const components: NonNullable<Config["admin"]>["components"] = {
  graphics: {
    Icon: {
      path: "@/components/admin/layout/icon",
      exportName: "Icon",
    },
    Logo: {
      path: "@/components/logo",
      exportName: "Logo",
    },
  },
  logout: {
    Button: {
      path: "@/components/admin/layout/logout-link",
      exportName: "LogoutLink",
    },
  },
};
