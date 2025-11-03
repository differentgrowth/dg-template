"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS, POSTS_PER_PAGE } from "@/queries/cache-tags";

export const getPostCount = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.POSTS);
  const payload = await getPayload({ config: configPromise });
  const { totalDocs } = await payload.count({
    collection: "posts",
    overrideAccess: false,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return totalDocs;
};

export const getTotalBlogDirectoryPages = async () => {
  const totalPosts = await getPostCount();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }).map((_, index) => ({
    page: `${index + 1}`,
  }));
};
