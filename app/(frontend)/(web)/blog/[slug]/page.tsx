import type { Metadata } from 'next';

import { draftMode } from 'next/headers';

import { LivePreviewListener } from '@/components/live-preview-listener';
import { PayloadRedirects } from '@/components/payload-redirects';
import { RelatedPosts } from '@/components/related-posts';
import { RichText } from '@/components/rich-text';
import { generateMeta } from '@/lib/generate-meta';
import { getPostBySlug } from '@/queries/get-post-by-slug';
import { getPostSlugs } from '@/queries/get-post-slugs';

export const generateStaticParams = async () => {
  const { docs: posts } = await getPostSlugs();

  const params = posts.map(({ slug }) => {
    return { slug };
  });

  return params;
};

export const generateMetadata = async ({
  params: paramsPromise,
}: PageProps): Promise<Metadata> => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;

  const post = await getPostBySlug({ slug, draft });

  return generateMeta({ doc: post });
};

type PageProps = {
  params: Promise<{
    slug?: string;
  }>;
  searchParams: Promise<Record<string, never>>;
};

export default async function Page({ params: paramsPromise }: PageProps) {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = `/${slug}`;
  const post = await getPostBySlug({ slug, draft });

  if (!post) {
    return <PayloadRedirects url={url} />;
  }

  return (
    <article className="pt-16 pb-16">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft ? <LivePreviewListener /> : null}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container max-w-4xl">
          <RichText data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
              docs={post.relatedPosts.filter(
                (item) => typeof item === 'object'
              )}
              intro="Posts relacionados"
            />
          )}
        </div>
      </div>
    </article>
  );
}
