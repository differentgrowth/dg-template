import type { Metadata } from 'next';

import { Hero } from '@/components/blocks/hero';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import { getServerSideURL } from '@/lib/get-url';
import { getHomePage } from '@/queries/get-homepage';

export const metadata: Metadata = {
  openGraph: {
    url: `${getServerSideURL()}`,
    siteName: 'Different Growth',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Page() {
  const { hero, blocks } = await getHomePage();

  return (
    <main>
      <Hero {...hero} />
      <RenderBlocks blocks={blocks} />
    </main>
  );
}
