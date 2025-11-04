import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const revalidatePosts: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
  context,
  operation,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  if (operation === "create" && !doc.title) {
    return;
  }

  payload.logger.info("Revalidating posts");

  updateTag(CACHE_TAGS.POSTS);
  return doc;
};

export const revalidateFeaturedPosts: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
  context,
  operation,
  previousDoc,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  if (operation === "create" && !doc.title) {
    return;
  }

  payload.logger.info("Revalidating featuredposts");
  if (doc.featured || previousDoc.featured) {
    updateTag(CACHE_TAGS.FEATURED_POSTS);
  }

  return doc;
};

export const revalidatePostsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  payload.logger.info("Revalidating posts after delete");

  updateTag(CACHE_TAGS.POSTS);
  return doc;
};

export const revalidateFeaturedPostsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  payload.logger.info("Revalidating featured posts after delete");
  if (doc.featured) {
    updateTag(CACHE_TAGS.FEATURED_POSTS);
  }

  return doc;
};
