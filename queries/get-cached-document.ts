import type { Config } from '@/payload-types';

import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

import configPromise from '@payload-config';

type Collection = keyof Config['collections'];

export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(
    async () => getDocument(collection, slug),
    [collection, slug],
    {
      tags: [`${collection}_${slug}`],
    }
  );

export async function getDocument(
  collection: Collection,
  slug: string,
  depth = 0
) {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return docs.at(0);
}
