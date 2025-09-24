import type { Config } from "payload";

import { resendAdapter } from "@payloadcms/email-resend";

export const email: NonNullable<Config["email"]> = resendAdapter({
  defaultFromAddress: "contact@differentgrowth.com",
  defaultFromName: "Ina - Different Growth",
  apiKey: process.env.RESEND_API_KEY || "",
});
