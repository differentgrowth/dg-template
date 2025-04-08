import type { MetadataRoute } from "next"

import { COMPANY_DATA } from "@/config/company"
import { getTotalBlogPages } from "@/queries/get-posts-count"
import { getPostsSitemap } from "@/queries/get-posts-sitemap"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, blogPages] = await Promise.all([
		getPostsSitemap(),
		getTotalBlogPages()
	])

	return [
		{
			url: `${COMPANY_DATA.URL}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1
		},
		{
			url: `${COMPANY_DATA.URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.5
		},
		...blogPages.map(({ page }) => ({
			url: `${COMPANY_DATA.URL}/blog/${page}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.5
		})),
		...posts.map((post) => ({
			url: `${COMPANY_DATA.URL}/${post.slug}`,
			lastModified: post.updatedAt,
			changeFrequency: "yearly" as const,
			priority: 0.7
		}))
	]
}
