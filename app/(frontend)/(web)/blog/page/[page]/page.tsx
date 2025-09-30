import type { Metadata } from "next/types";

import { notFound } from "next/navigation";

import { BlogPagination } from "@/components/blog-pagination";
import { PostsList } from "@/components/posts-list";
import { getTotalBlogDirectoryPages } from "@/queries/get-post-count";
import { getPosts } from "@/queries/get-posts";

export async function generateStaticParams() {
  const totalPages = await getTotalBlogDirectoryPages();

  return totalPages;
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const { page: pageNumber } = await paramsPromise;
  return {
    title: `DifferentGrowth Blog Page:${pageNumber || ""}`,
  };
}

export default async function Page({
  params: paramsPromise,
}: PageProps<"/blog/page/[page]">) {
  const { page: pageNumber } = await paramsPromise;

  const sanitizedPageNumber = Number(pageNumber);
  if (!Number.isInteger(sanitizedPageNumber)) {
    notFound();
  }

  const [{ docs: posts, totalPages, hasNextPage, hasPrevPage }] =
    await Promise.all([getPosts({ page: 1 })]);

  return (
    <div className="pt-24 pb-24">
      <BlogPagination
        className="container w-fit"
        currentPage={sanitizedPageNumber}
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
