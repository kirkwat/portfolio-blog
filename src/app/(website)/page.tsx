import { Suspense } from 'react';

import type { ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { appConfig } from '@/lib/config';
import { studioUrl } from '@/sanity/lib/api';
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live';
import { homePageQuery, siteSettingsQuery } from '@/sanity/lib/queries';

import { HomePage } from './home-page';

export async function generateMetadata(
  _props: PageProps<'/'>,
  parent: ResolvingMetadata,
) {
  const { perspective } = await getDynamicFetchOptions();
  const { data } = await sanityFetchMetadata({
    query: homePageQuery,
    perspective,
  });

  return {
    description: data?.landingSection?.subtitle || (await parent).description,
    alternates: {
      canonical: '/',
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: { url: '/', images: (await parent).openGraph?.images },
  };
}

export default async function IndexPage() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return <CachedIndexPage perspective="published" stega={false} />;
  }
  return (
    <Suspense>
      <DynamicIndexPage />
    </Suspense>
  );
}

async function DynamicIndexPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedIndexPage perspective={perspective} stega={stega} />;
}

async function CachedIndexPage({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const [{ data }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: homePageQuery, perspective, stega }),
    sanityFetch({ query: siteSettingsQuery, perspective, stega: false }),
  ]);

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    );
  }

  const sameAs = Object.values(siteSettings?.socials ?? {}).filter(
    (url): url is string => typeof url === 'string' && url.length > 0,
  );
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: data.title, url: appConfig.baseUrl },
      {
        '@type': 'Person',
        name: data.title,
        url: appConfig.baseUrl,
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
        }}
      />
      <HomePage data={data} />
    </>
  );
}
