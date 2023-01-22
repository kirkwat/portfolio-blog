import Head from 'next/head'
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
  const { coverImage, content, overview, date, title } = post || {}

  if (!post?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <Head>
        <PostPageHead post={post} title={homePageTitle} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <article className="mx-auto mb-6  max-w-3xl">
          <PostHeader title={title} coverImage={coverImage} date={date} />
          <div className="portableText">
            <CustomPortableText value={content} />
          </div>
        </article>
      </Layout>
    </>
  )
}
