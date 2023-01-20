import * as demo from 'lib/demo.data'
import Head from 'next/head'
import { notFound } from 'next/navigation'
import type { PostPayload } from 'types'

import BlogHeader from './BlogHeader'
import Layout from './BlogLayout'
import PostBody from './PostBody'
import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: PostPayload
  title: string | undefined

}

const NO_POSTS: PostPayload[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, title } = props

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <Head>
        <PostPageHead post={post} title={title}/>
      </Head>

      <Layout preview={preview} loading={loading}>
        <div className="container mx-auto px-5">
          <BlogHeader title={title} level={2} />
          {preview && !post ? (
            <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
              Loading...
            </h1>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                />
                <PostBody content={post.content} />
              </article>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}
