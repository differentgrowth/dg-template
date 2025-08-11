'use server';

import { unstable_cache } from 'next/cache';
import { getPayload, type Where } from 'payload';

import configPromise from '@payload-config';

import { CACHE_TAGS } from '@/queries/cache-tags';

export const getNavigation = unstable_cache(
  async ({ header, footer }: { header: boolean; footer: boolean }) => {
    const payload = await getPayload({ config: configPromise });

    const whereClause: Where = {
      ...(header ? { showOnHeader: { equals: true } } : {}),
      ...(footer ? { showOnFooter: { equals: true } } : {}),
    };

    const result = await payload.find({
      collection: 'pages',
      limit: -1,
      pagination: false,
      where: whereClause,
      select: {
        label: true,
        slug: true,
      },
      sort: 'order',
    });

    return result;
  },
  [CACHE_TAGS.PAGES],
  {
    tags: [CACHE_TAGS.PAGES],
  }
);
