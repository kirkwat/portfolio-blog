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
import { projectListPageQuery, projectsQuery } from '@/sanity/lib/queries';

export async function generateMetadata(
  _props: PageProps<'/projects'>,
  parent: ResolvingMetadata,
) {
  const { perspective } = await getDynamicFetchOptions();
  const { data } = await sanityFetchMetadata({
    query: projectListPageQuery,
    perspective,
  });

  return {
    title: data?.pageTitle,
    description: data?.subtitle || (await parent).description,
    alternates: {
      canonical: '/projects',
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: { url: '/projects', images: (await parent).openGraph?.images },
  };
}

export default async function ProjectsPage() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return <CachedProjectsPage perspective="published" stega={false} />;
  }
  return (
    <Suspense>
      <DynamicProjectsPage />
    </Suspense>
  );
}

async function DynamicProjectsPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedProjectsPage perspective={perspective} stega={stega} />;
}

async function CachedProjectsPage({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const [{ data: projects }, { data: projectListPage }] = await Promise.all([
    sanityFetch({ query: projectsQuery, perspective, stega }),
    sanityFetch({ query: projectListPageQuery, perspective, stega }),
  ]);

  return (
    <ContentListPage
      contentList={projects}
      contentListHeader={projectListPage}
    />
  );
}
