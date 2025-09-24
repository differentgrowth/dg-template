import type { GlobalAfterChangeHook } from "payload";

import { revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidateHomePage: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  payload.logger.info("Revalidating homepage");

  revalidateTag(CACHE_TAGS.HOME_PAGE);
  return doc;
};
