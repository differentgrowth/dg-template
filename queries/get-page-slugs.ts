import "server-only";

import { cache } from "react";

import type { Page } from "@/payload-types";
import { payloadClient } from "@/lib/payload";
import { PAGES_CACHE_TAG } from "./cache-tags";

export const getPageSlugs = cache(async (): Promise<Pick<Page, "slug">[]> => {
  const payload = await payloadClient();

  try {
    const { docs } = await payload.find({
      collection: "pages",
      projection: {
        slug: true,
      },
      depth: 0,
      draft: false,
      overrideAccess: false,
      limit: 0, // Fetch all
      next: {
        tags: [PAGES_CACHE_TAG],
      },
    });

    return docs;
  } catch (e) {
    console.error(
      `Error fetching page slugs: ${e instanceof Error ? e.message : e}`,
    );
    return [];
  }
});
