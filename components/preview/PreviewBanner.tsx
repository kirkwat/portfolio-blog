import Link from 'next/link'

/* eslint-disable @next/next/no-html-link-for-pages */
interface PreviewBannerProps {
  loading?: boolean
}

export function PreviewBanner({ loading }: PreviewBannerProps) {
  return (
    <div className="bg-black p-3 text-center text-white">
      {loading ? 'Loading...' : 'Previewing draft content.'}{' '}
      <Link
        className="underline transition hover:opacity-50"
        href="/api/exit-preview"
      >
        Exit preview mode
      </Link>
    </div>
  )
}
