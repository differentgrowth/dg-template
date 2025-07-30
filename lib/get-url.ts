export const getServerSideURL = () => {
  let url: string | undefined;

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = 'http://localhost:3000';
  }

  return url;
};

export const getClientSideURL = () => {
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  if (!canUseDOM) {
    return '';
  }

  const protocol = window.location.protocol;
  const domain = window.location.hostname;
  const port = window.location.port;

  return `${protocol}//${domain}${port ? `:${port}` : ''}`;
};

export const getMediaUrl = (
  url: string | null | undefined,
  cacheTag?: string | null
): string => {
  if (!url) {
    return '';
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url;
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL() || getServerSideURL();
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`;
};
