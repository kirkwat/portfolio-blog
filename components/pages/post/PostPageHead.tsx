import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { PostPayload } from 'types'

export interface PostPageHeadProps {
  post: PostPayload | undefined
  title: string | undefined
}

export default function PostPageHead({
  post,
  title,
}: PostPageHeadProps) {
  return (
    <SiteMeta
      baseTitle={title}
      description={post?.overview ? toPlainText(post.overview) : ''}
      image={post?.coverImage}
      title={post?.title}
    />
  )
}
