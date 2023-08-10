import { SiteMeta } from 'components/global/SiteMeta'
import { Header } from 'components/shared/Header'
import type { AboutPagePayload, SettingsPayload } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'

export interface AboutPageProps {
  aboutPage: AboutPagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function AboutPage({
  aboutPage,
  settings,
  homePageTitle,
  preview,
}: AboutPageProps) {
  const {
    pageTitle = 'About Me',
    subtitle = 'Learn more about me!',
    excerpt = 'Learn more about me!',
    content,
  } = aboutPage

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={excerpt || subtitle || ''}
        image={settings?.ogImage}
        title={pageTitle}
      />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto max-w-3xl">
          <Header title={pageTitle} subtitle={subtitle} centered />
          <div className="portableText">
            <CustomPortableText value={content} />
          </div>
        </article>
      </Layout>
    </>
  )
}
