import { PostsList } from "@/components/posts-list";
import { getPosts } from "@/queries/get-posts";

export default async function Page() {
  const [{ docs: posts, totalPages }] = await Promise.all([
    getPosts({ page: 1 }),
  ]);

  return (
    <main>
      <div className="container">Pages: {totalPages}</div>

      <PostsList posts={posts} />
    </main>
  );
}
