import ContentNavigation from 'components/shared/ContentNavigation'
import ScrollUp from 'components/shared/ScrollUp'
import { notFound } from 'next/navigation'
import type { PostPayload, SettingsPayload, ShowcasePost } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'

export interface PostPageProps {
  post: PostPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  posts: ShowcasePost[]
  preview?: boolean
}

export default function PostPage({
  post,
  settings,
  homePageTitle,
  posts,
  preview,
}: PostPageProps) {
  const { coverImage, content, tags, date, title } = post || {}

  if (!post?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead post={post} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto mb-6 max-w-3xl">
          <PostHeader
            title={title}
            coverImage={coverImage}
            date={date}
            tags={tags}
          />
          <div className="portableText">
            <CustomPortableText value={content} />
          </div>
          <ContentNavigation
            content={posts}
            slug={post.slug}
            contentType="post"
          />
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </article>
      </Layout>
    </>
  )
}
