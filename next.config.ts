import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: ["http://192.168.*.*:3000", "http://localhost:*"],
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  // Externalize packages that bring native binaries or register esbuild at runtime
  serverExternalPackages: [
    "esbuild",
    "esbuild-register",
    "drizzle-kit",
    "@payloadcms/db-vercel-postgres",
    "@payloadcms/drizzle",
  ],
  images: {
    qualities: [80, 100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "") as "https",
        };
      }),
    ],
  },
  async redirects() {
    return [
      {
        destination: "/ie-incompatible.html",
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(.*Trident.*)", // all ie browsers
          },
        ],
        permanent: false,
        source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
      },
    ];
  },
};

export default withPayload(nextConfig);
