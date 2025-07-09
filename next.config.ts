import type { NextConfig } from 'next';

import env from '@env';
import { withPayload } from '@payloadcms/next/withPayload';

const NEXT_PUBLIC_SERVER_URL = env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'https',
        };
      }),
    ],
  },
  // biome-ignore lint/suspicious/useAwait: nextjs convention
  async redirects() {
    return [
      {
        destination: '/ie-incompatible.html',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '(.*Trident.*)', // all ie browsers
          },
        ],
        permanent: false,
        source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
      },
    ];
  },
};

export default withPayload(nextConfig);
