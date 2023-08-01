import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import Link from 'next/link'
import { SettingsPayload } from 'types'

export interface NotFoundPageProps {
  settings?: SettingsPayload
  preview?: boolean
}

export function ServerError({ settings, preview }: NotFoundPageProps) {
  return (
    <Layout settings={settings} preview={preview}>
      <Header centered title="500 Server Error" />
      <div className="mx-auto flex justify-center">
        <Link
          className="mb-4 font-serif text-lg text-gray-600 underline hover:opacity-80 sm:text-xl md:mb-6 md:text-2xl"
          href="/"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  )
}
