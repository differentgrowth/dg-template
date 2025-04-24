"use server"

import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

import { CACHE_TAGS, POSTS_PER_PAGE } from "@/queries/cache-tags"
import configPromise from "@payload-config"

export const getPosts = unstable_cache(
	async ({ page = 1 }: { page?: number } = {}) => {
		const payload = await getPayload({ config: configPromise })
		const data = await payload.find({
			collection: "posts",
			depth: 1,
			limit: POSTS_PER_PAGE,
			page,
			overrideAccess: false,
			select: {
				slug: true,
				title: true,
				caption: true,
				categories: true,
				meta: true
			}
		})

		return data
	},
	[CACHE_TAGS.POSTS],
	{
		tags: [CACHE_TAGS.POSTS]
	}
)
