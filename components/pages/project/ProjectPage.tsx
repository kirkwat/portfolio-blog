import { SiteMeta } from 'components/global/SiteMeta'
import { notFound } from 'next/navigation'
import type { ProjectPayload, SettingsPayload, ShowcaseContent } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import ContentHeader from '../content/ContentHeader'
import ContentNavigation from '../content/ContentNavigation'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  projects: ShowcaseContent[]
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function ProjectPage({
  project,
  projects,
  settings,
  homePageTitle,
  preview,
}: ProjectPageProps) {
  const { coverImage, description, excerpt, tags, date, title } = project || {}

  if (!project?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={excerpt || ''}
        image={coverImage}
        title={title}
      />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto max-w-3xl">
          <ContentHeader title={title} date={date} tags={tags} />
          <div className="portableText">
            <CustomPortableText value={description} />
          </div>
          <ContentNavigation content={projects} slug={project.slug} />
        </article>
      </Layout>
    </>
  )
}
