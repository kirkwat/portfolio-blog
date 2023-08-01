import { usePreview } from 'lib/sanity.preview'
import { postBySlugQuery } from 'lib/sanity.queries'
import { PostPayload } from 'types'

import PostPage from './PostPage'
import { PostPageProps } from './PostPage'

export default function PostPreview({
  token,
  post,
  posts,
  settings,
  homePageTitle,
}: {
  token: null | string
} & PostPageProps) {
  const postPreview: PostPayload = usePreview(token, postBySlugQuery, {
    slug: post?.slug,
  })

  return (
    <PostPage
      post={postPreview}
      posts={posts}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}
