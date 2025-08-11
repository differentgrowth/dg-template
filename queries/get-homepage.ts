'use server';

import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

import configPromise from '@payload-config';

import { CACHE_TAGS } from '@/queries/cache-tags';

export const getHomePage = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: 'homepage',
      depth: 2,
    });

    return data;
  },
  [CACHE_TAGS.HOME_PAGE],
  {
    tags: [CACHE_TAGS.HOME_PAGE],
  }
);
