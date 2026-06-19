import { appConfig } from '@/lib/config';
import { sanityFetchMetadata } from '@/sanity/lib/live';
import { homePageTitleQuery, postsQuery } from '@/sanity/lib/queries';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * RSS 2.0 feed of all blog posts, rendered statically from the published
 * perspective (`sanityFetchMetadata` is a `'use cache'` leaf, mirroring
 * `app/sitemap.ts`). Linked site-wide via `alternates.types` in `app/layout.tsx`.
 */
export async function GET() {
  const [{ data: posts }, { data: homeTitle }] = await Promise.all([
    sanityFetchMetadata({ query: postsQuery, perspective: 'published' }),
    sanityFetchMetadata({
      query: homePageTitleQuery,
      perspective: 'published',
    }),
  ]);

  const items = (posts ?? [])
    .filter((post) => post.slug && post.title)
    .map((post) => {
      const link = `${appConfig.baseUrl}/posts/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title ?? '')}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid>${escapeXml(link)}</guid>`,
        ...(post.date
          ? [`      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`]
          : []),
        ...(post.excerpt
          ? [`      <description>${escapeXml(post.excerpt)}</description>`]
          : []),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const title = homeTitle ?? 'Blog';
  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${appConfig.baseUrl}</link>`,
    `    <description>${escapeXml(`Latest blog posts from ${title}`)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${appConfig.baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
