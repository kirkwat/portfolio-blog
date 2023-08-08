import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import Layout from 'components/shared/Layout'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import { LandingSection } from './LandingSection'
import { PostSection } from './PostSection'
import { ProjectSection } from './ProjectSection'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const {
    showcasePosts = [],
    showcaseProjects = [],
    title = 'Personal website',
    avatar,
    overview,
    postTitle = 'Blogs',
    postSubtitle = 'My latest blogs',
    projectTitle = 'Projects',
    projectSubtitle = 'My latest projects',
  } = page ?? {}

  return (
    <>
      <SiteMeta
        description={overview ? toPlainText(overview) : ''}
        image={settings?.ogImage}
        title={title}
      />

      <Layout settings={settings} preview={preview}>
        <div className="mx-auto max-w-7xl">
          <LandingSection
            title={title}
            avatar={avatar}
            overview={overview ? toPlainText(overview) : ''}
          />
          <PostSection showcasePosts={showcasePosts} />
          <ProjectSection avatar={avatar} showcaseProjects={showcaseProjects} />
        </div>
      </Layout>
    </>
  )
}
