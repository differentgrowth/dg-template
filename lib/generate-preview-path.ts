import type { CollectionSlug, PayloadRequest } from 'payload';

import env from '@env';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: env.PREVIEW_SECRET || '',
  });

  const url = `/api/v1/preview?${encodedParams.toString()}`;

  return url;
};
