"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getContactMethods = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.CONTACT_METHODS);
  const payload = await getPayload({ config: configPromise });
  const data = await payload.findGlobal({
    slug: "contact-methods",
  });

  return data;
};
