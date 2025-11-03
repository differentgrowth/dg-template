"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPostBySlug = async ({
  slug,
  draft = false,
}: {
  slug: string;
  draft?: boolean;
}) => {
  "use cache";
  cacheTag(CACHE_TAGS.POSTS);
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    limit: 1,
    draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
  });

  return result.docs?.[0] || null;
};
