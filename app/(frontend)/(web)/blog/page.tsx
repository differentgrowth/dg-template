import { BlogPagination } from "@/components/blog-pagination";
import { PostsList } from "@/components/posts-list";
import { getPosts } from "@/queries/get-posts";

export default async function Page() {
  const [{ docs: posts, totalPages, hasNextPage, hasPrevPage }] =
    await Promise.all([getPosts({ page: 1 })]);

  return (
    <div className="pt-24 pb-24">
      <BlogPagination
        className="container w-fit"
        currentPage={1}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalPages={totalPages}
      />

      <main>
        <PostsList posts={posts} />
      </main>
    </div>
  );
}
