import type { MetadataRoute } from 'next';

import { appConfig } from '@/lib/config';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api'],
    },
    sitemap: `${appConfig.baseUrl}/sitemap.xml`,
  } satisfies MetadataRoute.Robots;
}
