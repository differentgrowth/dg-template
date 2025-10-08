"use server";

import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getNavigation = unstable_cache(
  async ({ header, footer }: { header: boolean; footer: boolean }) => {
    const payload = await getPayload({ config: configPromise });

    const shownIn: ("header" | "footer")[] = [];
    if (header) {
      shownIn.push("header");
    }
    if (footer) {
      shownIn.push("footer");
    }

    const whereClause: Where = {
      shownIn: {
        in: shownIn,
      },
    };

    const result = await payload.find({
      collection: "pages",
      limit: -1,
      pagination: false,
      where: whereClause,
      select: {
        label: true,
        slug: true,
      },
      sort: "-createdAt",
    });

    return result;
  },
  [CACHE_TAGS.PAGES],
  {
    tags: [CACHE_TAGS.PAGES],
  }
);
