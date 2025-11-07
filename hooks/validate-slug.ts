import { APIError, type CollectionBeforeValidateHook } from "payload";

const invalidSlugs = ["admin", "admin-api", "api", "login", "blog"];

export const validateSlug: CollectionBeforeValidateHook = ({
  data,
  collection,
  operation,
  originalDoc,
  context,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return data;
  }

  // Early exit if no slug or not a relevant collection
  if (!(data?.slug && ["pages", "posts"].includes(collection.slug))) {
    return data;
  }

  if (operation === "update" && originalDoc.slug === data.slug) {
    return data; // Slug unchanged, skip cross-check
  }

  if (invalidSlugs.includes(data.slug)) {
    throw new APIError("Este slug está reservado");
  }

  return data;
};
