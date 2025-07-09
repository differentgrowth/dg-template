import type { Metadata } from 'next';
import type { Config, Media, Post } from '@/payload-types';

import { getServerSideURL } from '@/lib/get-url';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  let url = `${serverUrl}/opengraph-image.png`;

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image.png`,
    },
  ],
  siteName: 'Fisiomaternal',
  title: 'Fisiomaternal',
};

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};

// biome-ignore lint/suspicious/useAwait: I prefer this way
export const generateMeta = async (args: {
  doc: Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args || {};
  if (!doc) {
    return defaultOpenGraph;
  }

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title ? doc.meta.title : 'Fisiomaternal';

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title: {
      absolute: title,
    },
  };
};
