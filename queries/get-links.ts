"use server";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getLinks = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: "links",
    });

    return data;
  },
  [CACHE_TAGS.LINKS],
  { tags: [CACHE_TAGS.LINKS] }
);
