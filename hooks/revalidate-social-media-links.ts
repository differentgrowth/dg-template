import { revalidateTag } from "next/cache"
import type { GlobalAfterChangeHook } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"

export const revalidateSocialMediaLinks: GlobalAfterChangeHook = ({
	doc,
	req: { payload }
}) => {
	payload.logger.info("Revalidating social media links")
	revalidateTag(CACHE_TAGS.SOCIAL_MEDIA_LINKS)

	return doc
}
