import type { MetadataRoute } from "next";

import { getServerSideURL } from "@/lib/get-url";
import { getPageSlugs } from "@/queries/get-page-slugs";
import { getTotalBlogDirectoryPages } from "@/queries/get-post-count";
import { getPostSlugs } from "@/queries/get-post-slugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ docs: posts }, { docs: pages }, blogDirectoryPages] =
    await Promise.all([
      getPostSlugs(),
      getPageSlugs(),
      getTotalBlogDirectoryPages(),
    ]);

  const baseUrl = getServerSideURL();

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...blogDirectoryPages.map(({ page }) => ({
      url: `${baseUrl}/${page}`,
      lastModified: posts.at(0)?.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
