import type React from 'react';
import type { Page, Post, Redirect } from '@/payload-types';

import { notFound, redirect } from 'next/navigation';

import { getCachedDocument } from '@/queries/get-cached-document';
import { getCachedRedirects } from '@/queries/get-cached-redirects';

interface Props {
  disableNotFound?: boolean;
  url: string;
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  url,
}) => {
  const items = await getCachedRedirects();

  const redirectItem = items.find((item) => item.from === url);

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url);
    }

    const redirectUrl = await getRedirectUrl(redirectItem);

    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  if (disableNotFound) {
    return null;
  }

  notFound();
};

const getRedirectUrl = async (
  redirectItem: Redirect | undefined
): Promise<string> => {
  const isPostsCollection = redirectItem?.to?.reference?.relationTo === 'posts';
  const basePath = isPostsCollection ? '/blog' : '';

  if (typeof redirectItem?.to?.reference?.value === 'string') {
    const collection = redirectItem?.to?.reference?.relationTo;
    const id = redirectItem?.to?.reference?.value;

    const document = (await getCachedDocument(collection, id)()) as Page | Post;
    return `${basePath}/${document?.slug}`;
  }
  const slug =
    typeof redirectItem?.to?.reference?.value === 'object'
      ? redirectItem?.to?.reference?.value?.slug
      : '';
  return `${basePath}/${slug}`;
};
