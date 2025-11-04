import type { GlobalAfterChangeHook } from "payload";

import { updateTag } from "next/cache";

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
  updateTag(CACHE_TAGS.CONTACT_METHODS);

  return doc;
};
