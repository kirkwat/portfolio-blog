import '@/styles/index.css';
import { Suspense } from 'react';

import type { Viewport } from 'next';
import { draftMode } from 'next/headers';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { defineQuery } from 'next-sanity';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Toaster } from 'sonner';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  SanityLive,
  type DynamicFetchOptions,
} from '@/sanity/lib/live';
import { settingsQuery, siteSettingsQuery } from '@/sanity/lib/queries';
import { urlForOpenGraphImage } from '@/sanity/lib/utils';

import { handleError } from './client-functions';
import { DraftModeToast } from './draft-mode-toast';

export async function generateMetadata() {
  const { perspective } = await getDynamicFetchOptions();
  // `description` falls back to the landing subtitle — the `home` document has no
  // `overview` field, so this is the site-wide default for pages without their own copy.
  const layoutMetadataQuery = defineQuery(`{
    "settings": *[_type == "settings"][0]{ogImage},
    "home": *[_type == "home"][0]{
      title,
      "description": landingSection.subtitle,
    }
  }`);
  const {
    data: { settings, home },
  } = await sanityFetchMetadata({ query: layoutMetadataQuery, perspective });

  const ogImage = urlForOpenGraphImage(settings?.ogImage);
  return {
    title: home?.title
      ? {
          template: `%s | ${home.title}`,
          default: home.title || 'Personal website',
        }
      : undefined,
    description: home?.description,
    // RSS autodiscovery. Lives here (not in the static root-layout `metadata` export)
    // because an `alternates` key there makes `/studio/[[...index]]` fail to prerender
    // under Cache Components. Pages defining `alternates.canonical` re-declare `types`
    // since Next does not deep-merge `alternates`.
    alternates: { types: { 'application/rss+xml': '/feed.xml' } },
    openGraph: { images: ogImage ? [ogImage] : [] },
  };
}

export const viewport: Viewport = { themeColor: '#000' };

export default async function PersonalLayout({ children }: LayoutProps<'/'>) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <>
      <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground flex min-h-screen flex-col justify-between">
        {isDraftMode ? (
          <Suspense fallback={<NavbarFallback />}>
            <DynamicNavbar />
          </Suspense>
        ) : (
          <CachedNavbar perspective="published" stega={false} />
        )}
        <main className="mx-auto mt-20 mb-auto w-full px-4">{children}</main>
        {isDraftMode ? (
          <Suspense>
            <DynamicFooter />
          </Suspense>
        ) : (
          <CachedFooter perspective="published" stega={false} />
        )}
      </div>
      <Toaster />
      <SanityLive onError={handleError} includeDrafts={isDraftMode} />
      {isDraftMode && (
        <>
          <DraftModeToast
            action={async () => {
              'use server';

              await Promise.allSettled([
                (await draftMode()).disable(),
                // Simulate a delay to show the loading state
                new Promise((resolve) => setTimeout(resolve, 1000)),
              ]);
            }}
          />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  );
}

/**
 * Shared cache leaf — the navbar and footer both derive from the same settings data, so
 * neither has to wait independently for the same data.
 * `settingsQuery` carries the document id/keys used for visual editing, while
 * `siteSettingsQuery` carries the resume URL, header/footer display modes and socials.
 */
async function fetchSettings({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const [{ data: settings }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: settingsQuery, perspective, stega }),
    sanityFetch({ query: siteSettingsQuery, perspective, stega }),
  ]);
  return { settings, siteSettings };
}

async function DynamicNavbar() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedNavbar perspective={perspective} stega={stega} />;
}

async function CachedNavbar({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const { settings, siteSettings } = await fetchSettings({
    perspective,
    stega,
  });
  return (
    <Navbar
      data={settings}
      blackWhiteHeader={siteSettings?.header?.blackWhiteHeader}
      resume={siteSettings?.resume}
    />
  );
}

/**
 * Mirrors the real `<Navbar>` shell so the static fallback occupies the same vertical space.
 * Width of the placeholder link is arbitrary — height is what matters to avoid layout shift.
 */
function NavbarFallback() {
  return (
    <nav
      aria-busy
      className="border-foreground bg-background fixed top-0 z-[60] flex w-full flex-wrap items-center justify-between gap-x-5 border-b px-4 py-3 md:justify-start md:px-12 md:py-4"
    >
      <div className="text-2xl font-medium italic" aria-hidden>
        <Skeleton className="inline-block h-[1em] w-24 rounded-sm align-middle md:w-32" />
      </div>
    </nav>
  );
}

async function DynamicFooter() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedFooter perspective={perspective} stega={stega} />;
}

async function CachedFooter({ perspective, stega }: DynamicFetchOptions) {
  'use cache';
  const { settings, siteSettings } = await fetchSettings({
    perspective,
    stega,
  });
  if (!settings?.footer) {
    return null;
  }
  return <Footer footer={settings.footer} socials={siteSettings?.socials} />;
}
