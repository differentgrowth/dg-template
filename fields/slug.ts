/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Field } from "payload";

import { formatSlug } from "@/hooks/format-slug";

export const slug = ({
  targetField = "label",
}: {
  targetField?: string;
}): Field => ({
  name: "slug",
  label: "Slug",
  type: "text",
  unique: true,
  required: true,
  index: true,
  admin: {
    position: "sidebar",
    components: {
      Field: {
        path: "@/components/admin/fields/slug-generator#SlugGenerator",
        clientProps: {
          targetField,
          readOnly: true,
        },
      },
    },
  },
  hooks: {
    beforeValidate: [formatSlug({ targetField })],
  },
});
