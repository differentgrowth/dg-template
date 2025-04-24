"use server"

import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"
import configPromise from "@payload-config"

export const getPostsSitemap = unstable_cache(
	async () => {
		const payload = await getPayload({ config: configPromise })
		const { docs } = await payload.find({
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

		return docs
	},
	[CACHE_TAGS.POSTS],
	{ tags: [CACHE_TAGS.POSTS] }
)
