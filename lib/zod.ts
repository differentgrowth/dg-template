import { email, object, string, enum as zEnum } from "zod/v4";

export const contactEmailSchema = object({
  name: string({
    error: "Introduce tu nombre por favor.",
  })
    .trim()
    .min(1, "Introduce tu nombre por favor."),
  email: email({ error: "Introduce un email válido por favor." })
    .trim()
    .toLowerCase(),
  privacyCheck: zEnum(["on", "off"]).nullable(),
  message: string().trim().nullable(),
  email2: string().max(0, "¿Eres un bot?").nullable(),
});
