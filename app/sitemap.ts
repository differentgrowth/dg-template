import type { MetadataRoute } from 'next';

import { getServerSideURL } from '@/lib/get-url';
import { getPageSlugs } from '@/queries/get-page-slugs';
import { getPostSlugs } from '@/queries/get-post-slugs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ docs: posts }, { docs: pages }] = await Promise.all([
    getPostSlugs(),
    getPageSlugs(),
  ]);

  const baseUrl = getServerSideURL();

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
