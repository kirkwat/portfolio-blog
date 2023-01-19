import { usePreview } from 'lib/sanity.preview'
import { postsBySlugQuery } from 'lib/sanity.queries'
import type { PostPayload } from 'types'

import { PostPage, PostPageProps } from './PostPage'

export default function PostPreview({
  token,
  settings,
  post,
  homePageTitle,
}: {
  token: null | string
} & PostPageProps) {
  const postPreview: PostPayload = usePreview(token, postsBySlugQuery, {
    slug: post?.slug,
  })

  return (
    <PostPage
      post={postPreview}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}
