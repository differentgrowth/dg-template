"use server";

import { cacheTag } from "next/cache";
import { getPayload, type Where } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getNavigation = async ({
  header,
  footer,
}: {
  header: boolean;
  footer: boolean;
}) => {
  "use cache";
  cacheTag(CACHE_TAGS.PAGES);
  const payload = await getPayload({ config: configPromise });

  const shownIn: ("header" | "footer")[] = [];
  if (header) {
    shownIn.push("header");
  }
  if (footer) {
    shownIn.push("footer");
  }

  const whereClause: Where = {
    shownIn: {
      in: shownIn,
    },
  };

  const result = await payload.find({
    collection: "pages",
    limit: -1,
    pagination: false,
    where: whereClause,
    select: {
      label: true,
      slug: true,
    },
    sort: "-createdAt",
  });

  return result;
};
