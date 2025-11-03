"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getLinks = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.LINKS);
  const payload = await getPayload({ config: configPromise });
  const data = await payload.findGlobal({
    slug: "links",
  });

  return data;
};
