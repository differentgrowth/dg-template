/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

export const autoLogin: NonNullable<Config["admin"]>["autoLogin"] | undefined =
  process.env.NODE_ENV === "development" && process.env.AUTOLOGIN === "true"
    ? {
        email: process.env.ADMIN_EMAIL || "iam@email.com",
        password: process.env.ADMIN_PASSWORD || "Testing123!",
      }
    : undefined;
