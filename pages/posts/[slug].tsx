import { PreviewSuspense } from '@sanity/preview-kit'
import PostPage from 'components/pages/post/PostPage'
import {
  getHomePageTitle,
  getPostBySlug,
  getPostPaths,
  getSettings,
} from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import { PostPayload, SettingsPayload } from 'types'

const PreviewPostPage = lazy(() => import('components/pages/post/PostPreview'))

interface PageProps {
  post: PostPayload
  settings?: SettingsPayload
  title?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { title, post, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PostPage
            loading
            preview
            post={post}
            title={title}
          />
        }
      >
        <PreviewPostPage
          token={token}
          post={post}
          title={title}
          />
      </PreviewSuspense>
    )
  }

  return (
    <PostPage
      loading
      preview
      post={post}
      title={title}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, post, homePageTitle] = await Promise.all([
    getSettings({ token }),
    getPostBySlug({ token, slug: params.slug }),
    getHomePageTitle({ token }),

  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      settings,
      title: homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await getPostPaths()

  return {
    paths: paths?.map((slug) => resolveHref('post', slug)) || [],
    fallback: false,
  }
}
