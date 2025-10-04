/** biome-ignore-all lint/style/useNamingConvention: URL api convention */
export const getServerSideURL = () => {
  let url: string | undefined;

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = "http://localhost:3000";
  }

  return url;
};

export const getClientSideURL = () => {
  const canUseDom = Boolean(
    // window?.document?.createElement causes a ReferenceError in Next.js SSR where `window` is undefined. The safe version (`typeof window !== "undefined" && window.document && window.document.createElement`) ensures compatibility across server and client environments without runtime errors.
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );

  if (!canUseDom) {
    return "";
  }

  const protocol = window.location.protocol;
  const domain = window.location.hostname;
  const port = window.location.port;

  return `${protocol}//${domain}${port ? `:${port}` : ""}`;
};

export const getMediaUrl = (
  url: string | null | undefined,
  cacheTag?: string | null
): string => {
  if (!url) {
    return "";
  }

  // Check if URL already has http/https protocol
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return cacheTag ? `${url}?${cacheTag}` : url;
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL() || getServerSideURL();
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`;
};
