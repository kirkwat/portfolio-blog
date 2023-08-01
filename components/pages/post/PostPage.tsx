import ContentNavigation from 'components/pages/content/ContentNavigation'
import { notFound } from 'next/navigation'
import type { PostPayload, SettingsPayload, ShowcasePost } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import ContentHeader from '../content/ContentHeader'
import ContentPageHead from '../content/ContentPageHead'

export interface PostPageProps {
  post: PostPayload | undefined
  posts: ShowcasePost[]
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function PostPage({
  post,
  posts,
  settings,
  homePageTitle,
  preview,
}: PostPageProps) {
  const { coverImage, content, tags, date, title } = post || {}

  if (!post?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <ContentPageHead content={post} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto mb-6 max-w-3xl">
          <ContentHeader title={title} date={date} tags={tags} />
          <div className="portableText">
            <CustomPortableText value={content} />
          </div>
          <ContentNavigation content={posts} slug={post.slug} />
        </article>
      </Layout>
    </>
  )
}
