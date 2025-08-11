import type { Metadata } from 'next/types';

import { notFound } from 'next/navigation';

import { CollectionArchive } from '@/components/collection-archive';
import { PageRange } from '@/components/page-range';
import { PostsPagination } from '@/components/posts-pagination';
import { POSTS_PER_PAGE } from '@/queries/cache-tags';
import { getPosts } from '@/queries/get-posts';
import { getTotalBlogPages } from '@/queries/get-posts-count';

export async function generateStaticParams() {
  const totalPages = await getTotalBlogPages();

  return Array.from({ length: totalPages }).map((_, index) => ({
    page: `${index + 1}`,
  }));
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const { page: pageNumber } = await paramsPromise;
  return {
    title: `DifferentGrowth Posts Page ${pageNumber || ''}`,
  };
}

type PageProps = {
  params: Promise<{
    page: string;
  }>;
  searchParams: Promise<Record<string, never>>;
};

export default async function Page({ params: paramsPromise }: PageProps) {
  const { page: pageNumber } = await paramsPromise;

  const sanitizedPageNumber = Number(pageNumber);
  if (!Number.isInteger(sanitizedPageNumber)) {
    notFound();
  }

  const posts = await getPosts({ page: sanitizedPageNumber });

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div>
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={POSTS_PER_PAGE}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      {posts.totalPages > 1 && posts.page ? (
        <PostsPagination page={posts.page} totalPages={posts.totalPages} />
      ) : null}
    </div>
  );
}
