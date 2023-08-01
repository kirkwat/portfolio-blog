import { notFound } from 'next/navigation'
import type { ProjectPayload, SettingsPayload, ShowcaseProject } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import ContentHeader from '../content/ContentHeader'
import ContentNavigation from '../content/ContentNavigation'
import ContentPageHead from '../content/ContentPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  projects: ShowcaseProject[]
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
  const { client, coverImage, description, duration, site, tags, date, title } =
    project || {}

  if (!project?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <ContentPageHead content={project} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto mb-6 max-w-3xl">
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
