import { SiteMeta } from 'components/global/SiteMeta'
import ContentNavigation from 'components/pages/content/ContentNavigation'
import { notFound } from 'next/navigation'
import type { PostPayload, SettingsPayload, ShowcaseContent } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import ContentHeader from '../content/ContentHeader'

export interface PostPageProps {
  post: PostPayload | undefined
  posts: ShowcaseContent[]
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
  const { coverImage, content, tags, date, title, excerpt } = post || {}

  if (!post?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={excerpt || ''}
        image={coverImage}
        title={title}
      />

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto max-w-3xl">
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
