import './globals.css';
import type { Metadata } from 'next';
import { EB_Garamond, IBM_Plex_Mono, PT_Serif } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';

import { appConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

/**
 * Site-wide metadata ported from the old `components/global/SiteMeta.tsx` +
 * `pages/_document.tsx`. Icons are handled by the file conventions in `app/`
 * (favicon.ico, icon1/icon2.png, apple-icon.png — the old `public/favicon`
 * assets), while the web manifest and msapplication tiles keep their old
 * `/favicon/*` URLs. Titles, descriptions and Open Graph images are resolved
 * from Sanity in `app/(website)/layout.tsx`.
 */
export const metadata = {
  metadataBase: new URL(appConfig.baseUrl),
  manifest: '/favicon/site.webmanifest',
  twitter: { card: 'summary_large_image' },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
} satisfies Metadata;

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
});

const sans = EB_Garamond({
  variable: '--font-sans',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(mono.variable, sans.variable, serif.variable)}
    >
      <body>{children}</body>
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
