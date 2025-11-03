"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPostSlugs = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.POSTS);
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: -1,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: {
        equals: "published",
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return posts;
};
