'use server';

import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

import configPromise from '@payload-config';

import { CACHE_TAGS, POSTS_PER_PAGE } from '@/queries/cache-tags';

export const getPostCount = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    });

    return totalDocs;
  },
  [CACHE_TAGS.POSTS],
  {
    tags: [CACHE_TAGS.POSTS],
  }
);

export const getTotalBlogPages = async () => {
  const totalPosts = await getPostCount();
  return Math.ceil(totalPosts / POSTS_PER_PAGE);
};
