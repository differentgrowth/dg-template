import type { GlobalAfterChangeHook } from 'payload';

import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/queries/cache-tags';

export const revalidateHomepage: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info('Revalidating homepage');

  revalidateTag(CACHE_TAGS.HOME_PAGE);
  return doc;
};
