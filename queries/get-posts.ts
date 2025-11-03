"use server";

import { cacheTag } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS, POSTS_PER_PAGE } from "@/queries/cache-tags";

export const getPosts = async ({
  page = 1,
  quantity = POSTS_PER_PAGE,
}: {
  page?: number;
  quantity?: number;
} = {}) => {
  "use cache";
  cacheTag(CACHE_TAGS.POSTS);
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: quantity,
    page,
    overrideAccess: false,
    where: {
      _status: {
        equals: "published",
      },
    },
    select: {
      title: true,
      publishedAt: true,
      slug: true,
      description: true,
      categories: true,
      image: true,
      authors: true,
    },
    sort: "-publishedAt",
  });

  return posts;
};

export const getFeaturedPosts = async ({
  quantity = 3,
}: {
  quantity?: number;
} = {}) => {
  "use cache";
  cacheTag(CACHE_TAGS.FEATURED_POSTS);
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: quantity,
    pagination: false,
    where: {
      and: [
        {
          _status: {
            equals: "published",
          },
        },
        {
          featured: {
            equals: true,
          },
        },
      ],
    },
    select: {
      title: true,
      publishedAt: true,
      slug: true,
      description: true,
      categories: true,
      image: true,
      authors: true,
    },
    sort: "-publishedAt",
  });

  return posts;
};
