import type { Metadata } from 'next';

import { Hero } from '@/components/blocks/hero';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import { generateMeta } from '@/lib/generate-meta';
import { getPageBySlug } from '@/queries/get-page-by-slug';
import { getPageSlugs } from '@/queries/get-page-slugs';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { docs: pages } = await getPageSlugs();

  const params = pages.map(({ slug }) => {
    return { slug };
  });

  return params;
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const page = await getPageBySlug({ slug });

  return generateMeta({ doc: page, prefix: '/' });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { hero, blocks } = await getPageBySlug({ slug });

  return (
    <main>
      <Hero {...hero} />
      <RenderBlocks blocks={blocks} />
    </main>
  );
}
