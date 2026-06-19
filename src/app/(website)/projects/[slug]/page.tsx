import { Suspense } from 'react';

import type { ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import ContentHeader from '@/components/content/content-header';
import ContentNavigation from '@/components/content/content-navigation';
import { CustomPortableText } from '@/components/custom-portable-text';
import { appConfig } from '@/lib/config';
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
  type DynamicFetchOptions,
} from '@/sanity/lib/live';
import {
  homePageTitleQuery,
  projectBySlugQuery,
  projectPaths,
  projectsQuery,
} from '@/sanity/lib/queries';
import { urlForOpenGraphImage } from '@/sanity/lib/utils';

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: projectPaths });
  return data
    .map(({ slug }) => slug)
    .filter((slug): slug is string => typeof slug === 'string')
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps<'/projects/[slug]'>,
  parent: ResolvingMetadata,
) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  // Reuses the typegen-registered `projectBySlugQuery` (an inline metadata-only projection
  // wouldn't be registered in sanity.types.ts and would fall back to `{}` in strict mode).
  const { data } = await sanityFetchMetadata({
    query: projectBySlugQuery,
    params: { slug },
    perspective,
  });

  const ogImage = urlForOpenGraphImage(data?.coverImage);
  return {
    title: data?.title,
    description: data?.excerpt || (await parent).description,
    alternates: {
      canonical: `/projects/${slug}`,
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type: 'article',
      url: `/projects/${slug}`,
      publishedTime: data?.date || undefined,
      images: ogImage
        ? [ogImage, ...((await parent).openGraph?.images || [])]
        : (await parent).openGraph?.images,
    },
  };
}

export default async function ProjectSlugPage({
  params,
}: PageProps<'/projects/[slug]'>) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    const { slug } = await params;
    return (
      <CachedProjectSlugPage
        slug={slug}
        perspective="published"
        stega={false}
      />
    );
  }
  return (
    <Suspense>
      <DynamicProjectSlugPage params={params} />
    </Suspense>
  );
}

async function DynamicProjectSlugPage({
  params,
}: Pick<PageProps<'/projects/[slug]'>, 'params'>) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return (
    <CachedProjectSlugPage
      slug={slug}
      perspective={perspective}
      stega={stega}
    />
  );
}

async function CachedProjectSlugPage({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<'/projects/[slug]'>['params']> & DynamicFetchOptions) {
  'use cache';
  const [{ data: project }, { data: projects }, { data: homeTitle }] =
    await Promise.all([
      sanityFetch({
        query: projectBySlugQuery,
        params: { slug },
        perspective,
        stega,
      }),
      sanityFetch({ query: projectsQuery, perspective, stega }),
      sanityFetch({ query: homePageTitleQuery, perspective, stega: false }),
    ]);

  if (!project?.slug) notFound();

  const {
    _id,
    _type,
    description,
    excerpt,
    tags,
    date,
    title,
    slug: projectSlug,
  } = project;

  // `CreativeWork` rather than `BlogPosting`: projects are portfolio works, not
  // blog articles, and CreativeWork supports the same properties used here.
  const ogImage = urlForOpenGraphImage(project.coverImage);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${appConfig.baseUrl}/projects/${projectSlug}`,
    },
    ...(date && { datePublished: date }),
    ...(ogImage && { image: ogImage }),
    ...(excerpt && { description: excerpt }),
    ...(homeTitle && { author: { '@type': 'Person', name: homeTitle } }),
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
        }}
      />
      <ContentHeader title={title} date={date} tags={tags} />
      {description && (
        <div className="portableText">
          <CustomPortableText
            id={_id}
            type={_type}
            path={['description']}
            value={description}
            imageAltFallback={title ? `Image from ${title}` : undefined}
          />
        </div>
      )}
      <ContentNavigation content={projects} slug={projectSlug} />
    </article>
  );
}
