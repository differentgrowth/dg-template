import { revalidatePath, revalidateTag } from "next/cache"

import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook
} from "payload"

import type { Post } from "@/payload-types"

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	previousDoc,
	req: { payload, context }
}) => {
	if (!context.disableRevalidate) {
		if (doc._status === "published") {
			payload.logger.info("Revalidating blog layout")
			revalidateTag("posts")

			payload.logger.info(`Revalidating post at path: /${doc.slug}`)
			// revalidateTag(doc.slug)
			revalidatePath(`/${doc.slug}`)
		}

		// If the post was previously published, we need to revalidate the old path
		if (previousDoc._status === "published" && doc._status !== "published") {
			payload.logger.info(`Revalidating old posts: /${previousDoc.slug}`)
			revalidateTag("posts")
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
		revalidateTag("posts")
		// revalidateTag(doc.slug)
		revalidatePath(`/${doc.slug}`)
	}

	return doc
}
