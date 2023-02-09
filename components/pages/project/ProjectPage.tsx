import ScrollUp from 'components/shared/ScrollUp'
import { notFound } from 'next/navigation'
import type { ProjectPayload, SettingsPayload } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import ProjectHeader from './ProjectHeader'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function ProjectPage({
  project,
  settings,
  homePageTitle,
  preview,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { client, coverImage, description, duration, site, tags, date, title } =
    project || {}

  if (!project?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <ProjectPageHead project={project} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto mb-6 max-w-3xl">
          <ProjectHeader
            title={title}
            coverImage={coverImage}
            date={date}
            tags={tags}
            site={site}
            client={client}
            duration={duration}
          />
          <div className="portableText">
            <CustomPortableText value={description} />
          </div>
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </article>
      </Layout>
    </>
  )
}
