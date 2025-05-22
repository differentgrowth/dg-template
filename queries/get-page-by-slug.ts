import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import type { Page } from "@/payload-types";
import { PAGE_QUERY } from "@/queries/groq";
import { payloadClient } from "@/lib/payload";
import { PAGE_CACHE_TAG } from "./cache-tags";

export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    const payload = await payloadClient();
    const cookieStore = cookies();
    const preview = cookieStore.get("payload-token") ? true : false;

    try {
      const { docs } = await payload.find({
        collection: "pages",
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        draft: preview,
        overrideAccess: preview,
        next: {
          tags: [PAGE_CACHE_TAG(slug)],
        },
      });

      return docs[0] || null;
    } catch (e) {
      console.error(
        `Error fetching page by slug "${slug}": ${e instanceof Error ? e.message : e}`,
      );
      return null;
    }
  },
);
