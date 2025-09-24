import type React from "react";
import type { Page, Post, Redirect } from "@/payload-types";

import { notFound, redirect } from "next/navigation";

import { collectionPrefixMap } from "@/lib/generate-preview-path";
import { getServerSideURL } from "@/lib/get-url";
import { getCachedDocument } from "@/queries/get-cached-document";
import { getCachedRedirects } from "@/queries/get-cached-redirects";

type Props = {
  disableNotFound?: boolean;
  url: string;
};

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  url,
}) => {
  let slug: string | null = null;
  try {
    const parsedUrl = new URL(url, getServerSideURL()); // Use server URL as base for relative URLs
    slug = parsedUrl.pathname; // e.g., "/path/to/page" or "/"
  } catch (_error) {
    if (!disableNotFound) {
      notFound();
    }
    return null;
  }

  // Skip if the URL is just the host (root path "/")
  if (!slug || slug === "/") {
    if (!disableNotFound) {
      notFound();
    }
    return null;
  }

  // Normalize slug (remove leading/trailing slashes for matching)
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, ""); // e.g., "path/to/page"

  const serverUrl = getServerSideURL();
  const items = await getCachedRedirects();

  // Find a matching redirect item
  const redirectItem = items.find((item) => {
    // Normalize item.from for comparison
    let fromPath: string;
    try {
      // Handle item.from as full URL or path
      const fromUrl = item.from.startsWith("http")
        ? new URL(item.from)
        : new URL(item.from, serverUrl);
      fromPath = fromUrl.pathname.replace(/^\/+|\/+$/g, "");
    } catch (_error) {
      return false;
    }

    // Match normalized paths
    return fromPath === normalizedSlug;
  });

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url);
    }

    const redirectUrl = await getRedirectUrl(redirectItem);

    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  if (disableNotFound) {
    return null;
  }

  notFound();
};

const getRedirectUrl = async (
  redirectItem: Redirect | undefined
): Promise<string> => {
  const collectionRef = redirectItem?.to?.reference?.relationTo;
  const basePath = collectionRef ? collectionPrefixMap[collectionRef] : "";

  if (typeof redirectItem?.to?.reference?.value === "string") {
    const collection = redirectItem?.to?.reference?.relationTo;
    const id = redirectItem?.to?.reference?.value;

    const document = (await getCachedDocument(collection, id)()) as Page | Post;
    return `${basePath}/${document?.slug}`;
  }
  const slug =
    typeof redirectItem?.to?.reference?.value === "object"
      ? redirectItem?.to?.reference?.value?.slug
      : "";
  return `${basePath}/${slug}`;
};
