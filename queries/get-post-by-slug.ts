'use server';

import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

import configPromise from '@payload-config';

import { CACHE_TAGS } from '@/queries/cache-tags';

export const getPostBySlug = unstable_cache(
  async ({ slug, draft = false }: { slug: string; draft?: boolean }) => {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: 'posts',
      limit: 1,
      draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: 'published',
        },
      },
    });

    return result.docs?.[0] || null;
  },
  [CACHE_TAGS.POSTS],
  {
    tags: [CACHE_TAGS.POSTS],
  }
);
