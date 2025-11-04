import type { GlobalAfterChangeHook } from "payload";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidateLinks: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }
  payload.logger.info("Revalidating links");
  updateTag(CACHE_TAGS.LINKS);

  return doc;
};
