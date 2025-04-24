import { revalidatePath, revalidateTag } from "next/cache"
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook
} from "payload"

import type { Post } from "@/payload-types"
import { CACHE_TAGS } from "@/queries/cache-tags"

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	previousDoc,
	req: { payload, context }
}) => {
	if (!context.disableRevalidate) {
		if (doc._status === "published") {
			payload.logger.info("Revalidating blog layout")
			revalidateTag(CACHE_TAGS.POSTS)

			payload.logger.info(`Revalidating post at path: /${doc.slug}`)
			// revalidateTag(doc.slug)
			revalidatePath(`/${doc.slug}`)
		}

		// If the post was previously published, we need to revalidate the old path
		if (previousDoc._status === "published" && doc._status !== "published") {
			payload.logger.info(`Revalidating old posts: /${previousDoc.slug}`)
			revalidateTag(CACHE_TAGS.POSTS)
			// revalidateTag(previousDoc.slug)
			revalidatePath(`/${previousDoc.slug}`)
		}
	}
	return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
	doc,
	req: { payload, context }
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating deleted post at path: /${doc.slug}`)
		revalidateTag(CACHE_TAGS.POSTS)
		// revalidateTag(doc.slug)
		revalidatePath(`/${doc.slug}`)
	}

	return doc
}
