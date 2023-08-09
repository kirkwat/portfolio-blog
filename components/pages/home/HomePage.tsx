import { SiteMeta } from 'components/global/SiteMeta'
import Layout from 'components/shared/Layout'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import { ContentSection } from './ContentSection'
import { LandingSection } from './LandingSection'
import { ShowcaseSection } from './ShowcaseSection'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const { title, landingSection, contentSection, showcaseSection } = page ?? {}

  return (
    <>
      <SiteMeta
        description={landingSection.subtitle}
        image={settings?.ogImage}
        title={title}
      />

      <Layout settings={settings} preview={preview}>
        <div className="mx-auto max-w-7xl">
          <LandingSection title={title} landingSection={landingSection} />
          <ContentSection contentSection={contentSection} />
          <ShowcaseSection showcaseSection={showcaseSection} />
        </div>
      </Layout>
    </>
  )
}
