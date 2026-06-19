import '@/styles/index.css';
import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { sanityFetch, sanityFetchMetadata } from '@/sanity/lib/live';
import {
  homePageTitleQuery,
  settingsQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries';

/**
 * Global 404 for unmatched URLs. Lives at the root of `app/` (outside the
 * `(website)` route group) because unmatched routes only render through the
 * root layout — so this page recreates the website shell (navbar + footer)
 * itself, mirroring the old `pages/404.tsx` + `components/pages/NotFound.tsx`.
 *
 * Always rendered from the published perspective: draft-mode/visual-editing
 * never needs to preview a 404 shell.
 */

export async function generateMetadata() {
  const { data: homePageTitle } = await sanityFetchMetadata({
    query: homePageTitleQuery,
    perspective: 'published',
  });
  return {
    title: homePageTitle
      ? `404 Page Not Found | ${homePageTitle}`
      : '404 Page Not Found',
    description: '404 Page Not Found',
  };
}

async function fetchSettings() {
  'use cache';
  const [{ data: settings }, { data: siteSettings }] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
      perspective: 'published',
      stega: false,
    }),
    sanityFetch({
      query: siteSettingsQuery,
      perspective: 'published',
      stega: false,
    }),
  ]);
  return { settings, siteSettings };
}

export default async function NotFound() {
  const { settings, siteSettings } = await fetchSettings();
  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground flex min-h-screen flex-col justify-between">
      <Navbar
        data={settings}
        blackWhiteHeader={siteSettings?.header?.blackWhiteHeader}
        resume={siteSettings?.resume}
      />
      <main className="mx-auto mt-20 mb-auto px-4">
        <Header
          id={null}
          type={null}
          path={[]}
          centered
          title="404 Page Not Found"
        />
        <div className="mx-auto flex justify-center">
          <Button
            variant="link"
            nativeButton={false}
            className="text-foreground hover:text-primary mb-4 h-auto border-0 p-0 font-serif text-xl font-normal underline underline-offset-auto opacity-80 duration-300 hover:opacity-100 md:mb-6"
            render={<Link href="/" />}
          >
            Return to Home
          </Button>
        </div>
      </main>
      {settings?.footer && (
        <Footer footer={settings.footer} socials={siteSettings?.socials} />
      )}
    </div>
  );
}
