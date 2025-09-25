import { boolean, email, object, string } from "zod/v4";

const minPhoneDigits = 9;

export const contactEmailSchema = object({
  name: string({
    error: "Introduce tu nombre por favor.",
  })
    .trim()
    .min(1, "Introduce tu nombre por favor."),
  email: email({ error: "Introduce un email válido por favor." })
    .trim()
    .toLowerCase(),
  phone: string()
    .trim()
    .min(minPhoneDigits, "Introduce tu teléfono por favor."),
  message: string().trim().nullable(),
  privacyCheck: boolean().refine((value) => value === true, {
    message: "Debes aceptar la política de privacidad",
  }),
  email2: string().max(0, "¿Eres un bot?").nullable(),
});
