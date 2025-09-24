import { getPosts } from "@/queries/get-posts";

export default async function Page() {
  const [{ docs: posts, totalPages }] = await Promise.all([
    getPosts({ page: 1 }),
  ]);

  return (
    <main>
      <div className="section">
        Posts: {posts.length}
        Blog Pages: {totalPages}
      </div>
    </main>
  );
}
