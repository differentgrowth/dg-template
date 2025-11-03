"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPageBySlug = async ({
  slug,
  draft = false,
}: {
  slug: string;
  draft?: boolean;
}) => {
  "use cache";
  cacheTag(CACHE_TAGS.PAGES);
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    limit: 1,
    pagination: false,
    draft,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        draft
          ? {
              _status: {
                in: ["draft", "published"],
              },
            }
          : {
              _status: {
                equals: "published",
              },
            },
      ],
    },
  });

  return result.docs?.[0] || null;
};
