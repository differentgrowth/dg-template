import type { Config } from "@/payload-types";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

type Collection = keyof Config["collections"];

export async function getDocument(
  collection: Collection,
  slug: string,
  depth = 0
) {
  "use cache";
  cacheTag(`${collection}_${slug}`);
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return docs.at(0);
}
