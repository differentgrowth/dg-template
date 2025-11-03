"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getSocialMedia = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.SOCIAL_MEDIA_LINKS);
  const payload = await getPayload({ config: configPromise });
  const data = await payload.findGlobal({
    slug: "social-media",
  });

  return data;
};
