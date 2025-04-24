"use server"

import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"
import configPromise from "@payload-config"

export const getPostBySlug = unstable_cache(
	async ({ slug, draft }: { slug: string; draft: boolean }) => {
		const payload = await getPayload({ config: configPromise })
		const { docs } = await payload.find({
			collection: "posts",
			draft,
			limit: 1,
			overrideAccess: draft,
			pagination: false,
			where: {
				slug: {
					equals: slug
				}
			}
		})

		return docs.at(0) || null
	},
	[CACHE_TAGS.POSTS],
	{ tags: [CACHE_TAGS.POSTS] }
)
