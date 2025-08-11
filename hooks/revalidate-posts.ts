import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/queries/cache-tags';

export const revalidatePost: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info('Revalidating posts');

  revalidateTag(CACHE_TAGS.POSTS);
  return doc;
};

export const revaliatePostAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info('Revalidating posts after delete');

  revalidateTag(CACHE_TAGS.POSTS);
  return doc;
};
