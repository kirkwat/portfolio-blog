import { SiteMeta } from 'components/global/SiteMeta'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import Link from 'next/link'
import { SettingsPayload } from 'types'

export interface NotFoundPageProps {
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function ServerError({
  settings,
  homePageTitle,
  preview,
}: NotFoundPageProps) {
  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={'500 Server Error'}
        image={settings?.ogImage}
        title={'500 Server Error'}
      />

      <Layout settings={settings} preview={preview}>
        <Header centered title="500 Server Error" />
        <div className="mx-auto flex justify-center">
          <Link
            className="mb-4 font-serif text-xl underline opacity-80 transition-all duration-300 hover:text-pink-300 hover:opacity-100 md:mb-6"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      </Layout>
    </>
  )
}
