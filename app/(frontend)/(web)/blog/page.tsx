import type { Metadata } from 'next/types';

import { notFound } from 'next/navigation';

import { CollectionArchive } from '@/components/collection-archive';
import { PageRange } from '@/components/page-range';
import { PostsPagination } from '@/components/posts-pagination';
import { POSTS_PER_PAGE } from '@/queries/cache-tags';
import { getPosts } from '@/queries/get-posts';

export const generateMetadata = (): Metadata => {
  return {
    title: 'DifferentGrowth Blog',
  };
};

export default async function Page() {
  const posts = await getPosts();

  if (!posts.totalDocs) {
    notFound();
  }

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
