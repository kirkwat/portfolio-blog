import type { MetadataRoute } from 'next';

import { appConfig } from '@/lib/config';
import { sanityFetchMetadata } from '@/sanity/lib/live';
import { postPaths, projectPaths } from '@/sanity/lib/queries';

export default async function sitemap() {
  const [{ data: posts }, { data: projects }] = await Promise.all([
    sanityFetchMetadata({ query: postPaths, perspective: 'published' }),
    sanityFetchMetadata({ query: projectPaths, perspective: 'published' }),
  ]);

  return [
    { url: appConfig.baseUrl, priority: 1 },
    { url: `${appConfig.baseUrl}/about`, priority: 0.8 },
    { url: `${appConfig.baseUrl}/posts`, priority: 0.8 },
    { url: `${appConfig.baseUrl}/projects`, priority: 0.8 },
    ...(posts ?? []).map(({ slug, lastModified }) => ({
      url: `${appConfig.baseUrl}/posts/${slug}`,
      lastModified,
      priority: 0.6,
    })),
    ...(projects ?? []).map(({ slug, lastModified }) => ({
      url: `${appConfig.baseUrl}/projects/${slug}`,
      lastModified,
      priority: 0.6,
    })),
  ] satisfies MetadataRoute.Sitemap;
}
