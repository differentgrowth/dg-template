"use server";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getCachedRedirects = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });

    const { docs: redirects } = await payload.find({
      collection: "redirects",
      depth: 1,
      limit: -1,
      pagination: false,
    });

    return redirects;
  },
  [CACHE_TAGS.REDIRECTS],
  {
    tags: [CACHE_TAGS.REDIRECTS],
  }
);
