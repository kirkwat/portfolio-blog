import ScrollUp from 'components/shared/ScrollUp'
import { notFound } from 'next/navigation'
import type { PostPayload, SettingsPayload } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import Layout from '../../shared/Layout'
import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'

export interface PostPageProps {
  post: PostPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function PostPage({
  post,
  settings,
  homePageTitle,
  preview,
}: PostPageProps) {
  const { coverImage, content, tags, date, title } = post || {}

  if (!post?.slug && !preview) {
    notFound()
  }

  console.log(content)

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
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </article>
      </Layout>
    </>
  )
}
