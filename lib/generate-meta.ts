import type { Metadata } from 'next';
import type { Config, Media, Page, Post } from '@/payload-types';

import { getServerSideURL } from '@/lib/get-url';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  let url = `${serverUrl}/opengraph-image.png`;

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url || image.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image.png`,
    },
  ],
  siteName: 'Different Growth',
  title: 'Different Growth',
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

function buildCanonicalUrl(
  prefix: string,
  slug: string[] | string | undefined
): string {
  const path = `/${Array.isArray(slug) ? slug.join('/') : slug || '/'}`;
  return prefix ? `${prefix}${path}` : path;
}

// biome-ignore lint/suspicious/useAwait: no problem
export const generateMeta = async (args: {
  doc: Partial<Post | Page>;
  prefix?: string;
  isDraft?: boolean;
}): Promise<Metadata> => {
  const { doc, prefix = '/', isDraft = false } = args || {};

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title ? `${doc?.meta?.title}` : 'Different Growth';

  if (isDraft) {
    return {
      description: doc?.meta?.description,
      alternates: {
        canonical: buildCanonicalUrl(prefix, doc?.slug),
      },
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
        url: buildCanonicalUrl(prefix, doc?.slug),
      }),
      title: { absolute: title },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }

  return {
    title,
    description: doc?.meta?.description,
    alternates: {
      canonical: buildCanonicalUrl(prefix, doc?.slug),
    },
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
      url: buildCanonicalUrl(prefix, doc?.slug),
    }),
  };
};
