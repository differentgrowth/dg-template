import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidatePages: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }
  payload.logger.info(`Revalidating page ${doc.label}`);

  updateTag(CACHE_TAGS.PAGES);
  return doc;
};

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }
  payload.logger.info(`Revalidating page ${doc.label} after delete`);

  updateTag(CACHE_TAGS.PAGES);
  return doc;
};
