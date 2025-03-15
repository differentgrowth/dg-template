import type { MetadataRoute } from "next"

import { getPayload } from "payload"

import { COMPANY_DATA } from "@/config/company"
import config from "@payload-config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const payload = await getPayload({ config })
	const posts = await payload.find({
		collection: "posts",
		overrideAccess: false,
		draft: false,
		depth: 0,
		limit: 1000,
		pagination: false,
		where: {
			_status: {
				equals: "published"
			}
		},
		select: {
			slug: true,
			updatedAt: true
		}
	})

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
		...posts.docs.map((post) => ({
			url: `${COMPANY_DATA.URL}/${post.slug}`,
			lastModified: post.updatedAt,
			changeFrequency: "yearly" as const,
			priority: 0.7
		}))
	]
}
