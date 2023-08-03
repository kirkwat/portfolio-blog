import { SiteMeta } from 'components/global/SiteMeta'
import { PostPayload, ProjectPayload } from 'types'

export interface ContentPageHeadProps {
  content: PostPayload | ProjectPayload | undefined
  title: string | undefined
}

export default function ContentPageHead({
  content,
  title,
}: ContentPageHeadProps) {
  return (
    <SiteMeta
      baseTitle={title}
      description={content?.excerpt ? content.excerpt : ''}
      image={content?.coverImage}
      title={content?.title}
    />
  )
}
