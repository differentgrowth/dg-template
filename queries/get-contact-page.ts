"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getContactPage = async () => {
  "use cache";
  cacheTag(CACHE_TAGS.CONTACT_PAGE);
  const payload = await getPayload({ config: configPromise });
  const data = await payload.findGlobal({
    slug: "contact-page",
    depth: 2,
  });

  return data;
};
