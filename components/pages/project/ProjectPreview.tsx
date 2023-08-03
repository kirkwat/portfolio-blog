import { usePreview } from 'lib/sanity.preview'
import { projectBySlugQuery } from 'lib/sanity.queries'
import type { ProjectPayload } from 'types'

import ProjectPage from './ProjectPage'
import { ProjectPageProps } from './ProjectPage'

export default function ProjectPreview({
  token,
  project,
  projects,
  settings,
  homePageTitle,
}: {
  token: null | string
} & ProjectPageProps) {
  const projectPreview: ProjectPayload = usePreview(token, projectBySlugQuery, {
    slug: project?.slug,
  })

  return (
    <ProjectPage
      project={projectPreview}
      projects={projects}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}
