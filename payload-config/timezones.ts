import type { Config } from "payload";

export const timezones: NonNullable<Config["admin"]>["timezones"] = {
  supportedTimezones: [{ value: "Europe/Madrid", label: "Madrid" }],
  defaultTimezone: "Europe/Madrid",
};
