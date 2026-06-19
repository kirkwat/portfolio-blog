import { Suspense } from 'react';

import type { ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';

import { ContentListPage } from '@/components/content/content-list-page';
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live';
import { postListPageQuery, postsQuery } from '@/sanity/lib/queries';

export async function generateMetadata(
  _props: PageProps<'/posts'>,
  parent: ResolvingMetadata,
) {
  const { perspective } = await getDynamicFetchOptions();
  const { data } = await sanityFetchMetadata({
    query: postListPageQuery,
    perspective,
  });

  return {
    title: data?.pageTitle || 'Posts',
    description: data?.subtitle || (await parent).description,
    alternates: {
      canonical: '/posts',
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: { url: '/posts', images: (await parent).openGraph?.images },
  };
}

export default async function PostsPage() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return <CachedPostsPage perspective="published" stega={false} />;
  }
  return (
    <Suspense>
      <DynamicPostsPage />
    </Suspense>
  );
}

async function DynamicPostsPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedPostsPage perspective={perspective} stega={stega} />;
}

async function CachedPostsPage({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const [{ data: posts }, { data: postListPage }] = await Promise.all([
    sanityFetch({ query: postsQuery, perspective, stega }),
    sanityFetch({ query: postListPageQuery, perspective, stega }),
  ]);

  return (
    <ContentListPage contentList={posts} contentListHeader={postListPage} />
  );
}
