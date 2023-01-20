/* eslint-disable @next/next/no-html-link-for-pages */

export default function Alert({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  if (!preview) return null

  return (
    <div className="border-b border-accent-7 bg-accent-7 text-white">
      <div className="container mx-auto px-5">
        <div className="py-2 text-center text-sm">
          {loading ? 'Loading... ' : 'This page is a preview. '}
          <a
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Click here
          </a>{' '}
          to exit preview mode.
        </div>
      </div>
    </div>
  )
}
