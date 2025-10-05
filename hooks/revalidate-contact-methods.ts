import type { GlobalAfterChangeHook } from "payload";

import { revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidateContactMethods: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  payload.logger.info("Revalidating contact methods");
  revalidateTag(CACHE_TAGS.CONTACT_METHODS);

  return doc;
};
