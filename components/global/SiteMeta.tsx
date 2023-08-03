import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'
import type { Image } from 'sanity'

export function SiteMeta({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string
  description?: string
  image?: Image
  title?: string
}) {
  const metaTitle = [
    ...(title ? [title] : []),
    ...(baseTitle ? [baseTitle] : []),
  ].join(' | ')

  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit('crop').url()

  return (
    <Head>
      <title>{metaTitle}</title>
      {description && (
        <meta key="description" name="description" content={description} />
      )}

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={baseTitle || title} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={description} />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}
    </Head>
  )
}
