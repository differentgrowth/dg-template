import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import type { Homepage } from "@/payload-types";
import { payloadClient } from "@/lib/payload";
import { HOMEPAGE_CACHE_TAG } from "./cache-tags";

export const getHomepageData = cache(async (): Promise<Homepage | null> => {
  const payload = await payloadClient();
  const cookieStore = cookies();
  const preview = cookieStore.get("payload-token") ? true : false;

  try {
    const homepageData = await payload.findGlobal({
      slug: "homepage",
      depth: 2, // Adjust depth as needed to populate featured posts
      draft: preview,
      overrideAccess: preview,
      // @ts-expect-error // TODO: Fix this type error
      next: {
        tags: [HOMEPAGE_CACHE_TAG],
      },
    });

    return homepageData;
  } catch (e) {
    console.error(
      `Error fetching homepage data: ${e instanceof Error ? e.message : e}`,
    );
    return null;
  }
});
