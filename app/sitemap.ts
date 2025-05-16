import type { MetadataRoute } from "next"

import { getServerSideURL } from "@/lib/get-url"
import { getTotalBlogPages } from "@/queries/get-posts-count"
import { getPostsSitemap } from "@/queries/get-posts-sitemap"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, totalPages] = await Promise.all([
		getPostsSitemap(),
		getTotalBlogPages()
	])

	const blogPages = Array.from({ length: totalPages }).map((_, index) => ({
		page: `${index + 1}`
	}))

	return [
		{
			url: `${getServerSideURL()}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1
		},
		{
			url: `${getServerSideURL()}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.5
		},
		...blogPages.map(({ page }) => ({
			url: `${getServerSideURL()}/blog/${page}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.5
		})),
		...posts.map((post) => ({
			url: `${getServerSideURL()}/${post.slug}`,
			lastModified: post.updatedAt,
			changeFrequency: "yearly" as const,
			priority: 0.7
		}))
	]
}
