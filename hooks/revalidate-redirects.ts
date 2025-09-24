import type { CollectionAfterChangeHook } from "payload";

import { revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }
  payload.logger.info("Revalidating redirects");

  revalidateTag(CACHE_TAGS.REDIRECTS);

  return doc;
};
