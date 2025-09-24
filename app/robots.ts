import type { MetadataRoute } from "next";

import { getServerSideURL } from "@/lib/get-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*.json$",
        "/*_buildManifest.js$",
        "/*_middlewareManifest.js$",
        "/*_ssgManifest.js$",
        "/*.js$",
        "/_next/*",
        "/api/*",
        "/admin-api/*",
        "/admin/*",
      ],
    },
    sitemap: `${getServerSideURL()}/sitemap.xml`,
  };
}
