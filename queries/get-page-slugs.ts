"use server";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPageSlugs = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
      collection: "pages",
      depth: 1,
      limit: -1,
      overrideAccess: false,
      pagination: false,
      where: {
        _status: { equals: "published" },
      },
      select: {
        slug: true,
        label: true,
        updatedAt: true,
      },
    });

    return pages;
  },
  [CACHE_TAGS.PAGES],
  {
    tags: [CACHE_TAGS.PAGES],
  }
);
