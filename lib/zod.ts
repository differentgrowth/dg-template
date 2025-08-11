import { email, literal, object, string, union, enum as zEnum } from 'zod/v4';

const websiteRegex =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

export const contactEmailSchema = object({
  name: string({
    error: 'Introduce tu nombre por favor.',
  })
    .trim()
    .min(1, 'Introduce tu nombre por favor.'),
  email: email({ error: 'Introduce un email válido por favor.' })
    .trim()
    .toLowerCase(),
  website: union([
    string().trim().regex(websiteRegex, 'Introduce una url válida'),
    literal(''),
  ]).nullable(),
  agency: zEnum(['on', 'off']).nullable(),
  message: string().trim().nullable(),
  email2: string().max(0, '¿Eres un bot?').nullable(),
});
