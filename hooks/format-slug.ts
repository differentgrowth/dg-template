import type { FieldHook } from 'payload';

import { slugify } from '@/lib/utils';

export const formatSlug =
  ({ targetField = 'title' }: { targetField?: string } = {}): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return slugify(value);
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[targetField] || data?.[targetField];

      if (fallbackData && typeof fallbackData === 'string') {
        return slugify(fallbackData);
      }
    }

    return value;
  };
