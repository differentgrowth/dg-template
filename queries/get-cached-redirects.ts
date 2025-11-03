"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getCachedRedirects = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.REDIRECTS);
  const payload = await getPayload({ config: configPromise });

  const { docs: redirects } = await payload.find({
    collection: "redirects",
    depth: 1,
    limit: -1,
    pagination: false,
  });

  return redirects;
};
