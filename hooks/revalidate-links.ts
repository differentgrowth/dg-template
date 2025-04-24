import { revalidateTag } from "next/cache"
import type { GlobalAfterChangeHook } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"

export const revalidateLinks: GlobalAfterChangeHook = ({
	doc,
	req: { payload }
}) => {
	payload.logger.info("Revalidating links")
	revalidateTag(CACHE_TAGS.LINKS)

	return doc
}
