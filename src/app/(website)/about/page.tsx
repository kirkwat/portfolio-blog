import { Suspense } from 'react';

import type { ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { CustomPortableText } from '@/components/custom-portable-text';
import { Header } from '@/components/header';
import { studioUrl } from '@/sanity/lib/api';
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live';
import { aboutPageQuery } from '@/sanity/lib/queries';

export async function generateMetadata(
  _props: PageProps<'/about'>,
  parent: ResolvingMetadata,
) {
  const { perspective } = await getDynamicFetchOptions();
  const { data } = await sanityFetchMetadata({
    query: aboutPageQuery,
    perspective,
  });

  return {
    title: data?.pageTitle ?? 'About Me',
    description: data?.excerpt || data?.subtitle || (await parent).description,
    alternates: {
      canonical: '/about',
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: { url: '/about', images: (await parent).openGraph?.images },
  };
}

export default async function AboutRoute() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return <CachedAboutPage perspective="published" stega={false} />;
  }
  return (
    <Suspense>
      <DynamicAboutPage />
    </Suspense>
  );
}

async function DynamicAboutPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedAboutPage perspective={perspective} stega={stega} />;
}

async function CachedAboutPage({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const { data } = await sanityFetch({
    query: aboutPageQuery,
    perspective,
    stega,
  });

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have an about page yet,{' '}
        <Link href={`${studioUrl}/structure/about`} className="underline">
          create one now
        </Link>
        !
      </div>
    );
  }

  const { pageTitle, subtitle, content } = data;

  return (
    <article className="mx-auto max-w-3xl">
      <Header
        id={null}
        type={null}
        path={['content']}
        title={pageTitle ?? 'About Me'}
        subtitle={subtitle ?? 'Learn more about me!'}
        centered
      />
      {Array.isArray(content) && (
        <div className="portableText">
          <CustomPortableText
            id={null}
            type={null}
            path={['content']}
            value={content}
            imageAltFallback={`Image from ${pageTitle ?? 'About Me'}`}
          />
        </div>
      )}
    </article>
  );
}
