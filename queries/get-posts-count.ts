import { unstable_cache } from "next/cache"

import { getPayload } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"
import { POSTS_PER_PAGE } from "@/queries/get-posts"
import configPromise from "@payload-config"

export const getPostCount = unstable_cache(
	async () => {
		const payload = await getPayload({ config: configPromise })
		const { totalDocs } = await payload.count({
			collection: "posts",
			overrideAccess: false
		})

		return totalDocs
	},
	[CACHE_TAGS.POSTS],
	{
		tags: [CACHE_TAGS.POSTS]
	}
)

export const getTotalBlogPages = async () => {
	const totalPosts = await getPostCount()
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

	return Array.from({ length: totalPages }).map((_, index) => ({
		page: `${index + 1}`
	}))
}
