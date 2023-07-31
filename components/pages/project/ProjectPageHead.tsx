import { SiteMeta } from 'components/global/SiteMeta'
import { ProjectPayload } from 'types'

export interface ProjectPageHeadProps {
  project: ProjectPayload | undefined
  title: string | undefined
}

export default function ProjectPageHead({
  project,
  title,
}: ProjectPageHeadProps) {
  return (
    <SiteMeta
      baseTitle={title}
      description={project?.excerpt ? project.excerpt : ''}
      image={project?.coverImage}
      title={project?.title}
    />
  )
}
