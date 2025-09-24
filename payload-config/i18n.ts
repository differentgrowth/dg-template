import type { Config } from "payload";

import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";

export const i18n: NonNullable<Config["i18n"]> = {
  fallbackLanguage: "es",
  supportedLanguages: { en, es },
};
