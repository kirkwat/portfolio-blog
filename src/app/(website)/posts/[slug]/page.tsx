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
  postBySlugQuery,
  postPaths,
  postsQuery,
} from '@/sanity/lib/queries';
import { urlForOpenGraphImage } from '@/sanity/lib/utils';

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({ query: postPaths });
  return (data || [])
    .map(({ slug }) => slug)
    .filter((slug): slug is string => typeof slug === 'string')
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps<'/posts/[slug]'>,
  parent: ResolvingMetadata,
) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const { data } = await sanityFetchMetadata({
    query: postBySlugQuery,
    params: { slug },
    perspective,
  });

  const ogImage = urlForOpenGraphImage(data?.coverImage);
  return {
    title: data?.title,
    description: data?.excerpt || (await parent).description,
    alternates: {
      canonical: `/posts/${slug}`,
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type: 'article',
      url: `/posts/${slug}`,
      publishedTime: data?.date || undefined,
      images: ogImage
        ? [ogImage, ...((await parent).openGraph?.images || [])]
        : (await parent).openGraph?.images,
    },
  };
}

export default async function PostSlugPage({
  params,
}: PageProps<'/posts/[slug]'>) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    const { slug } = await params;
    return (
      <CachedPostSlugPage slug={slug} perspective="published" stega={false} />
    );
  }
  return (
    <Suspense>
      <DynamicPostSlugPage params={params} />
    </Suspense>
  );
}

async function DynamicPostSlugPage({
  params,
}: Pick<PageProps<'/posts/[slug]'>, 'params'>) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return (
    <CachedPostSlugPage slug={slug} perspective={perspective} stega={stega} />
  );
}

async function CachedPostSlugPage({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<'/posts/[slug]'>['params']> & DynamicFetchOptions) {
  'use cache';
  const [{ data: post }, { data: posts }, { data: homeTitle }] =
    await Promise.all([
      sanityFetch({
        query: postBySlugQuery,
        params: { slug },
        perspective,
        stega,
      }),
      sanityFetch({ query: postsQuery, perspective, stega }),
      sanityFetch({ query: homePageTitleQuery, perspective, stega: false }),
    ]);

  if (!post?.slug) notFound();

  const { content, date, excerpt, slug: postSlug, tags, title } = post;

  const ogImage = urlForOpenGraphImage(post.coverImage);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${appConfig.baseUrl}/posts/${postSlug}`,
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
      {Array.isArray(content) && (
        <div className="portableText">
          <CustomPortableText
            id={null}
            type={null}
            path={['content']}
            value={content}
            imageAltFallback={title ? `Image from ${title}` : undefined}
          />
        </div>
      )}
      <ContentNavigation content={posts} slug={postSlug} />
    </article>
  );
}
