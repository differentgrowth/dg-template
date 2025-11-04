import type { GlobalAfterChangeHook } from "payload";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidateBlogPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  payload.logger.info("Revalidating blog page");

  updateTag(CACHE_TAGS.BLOG_PAGE);
  return doc;
};
