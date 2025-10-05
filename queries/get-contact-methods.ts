"use server";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getContactMethods = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: "contact-methods",
    });

    return data;
  },
  [CACHE_TAGS.CONTACT_METHODS],
  { tags: [CACHE_TAGS.CONTACT_METHODS] }
);
