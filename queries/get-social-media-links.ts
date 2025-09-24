"use server";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getSocialMediaLinks = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: "social-media-links",
    });

    return data;
  },
  [CACHE_TAGS.SOCIAL_MEDIA_LINKS],
  { tags: [CACHE_TAGS.SOCIAL_MEDIA_LINKS] }
);
