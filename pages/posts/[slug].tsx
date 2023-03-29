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
  homePageTitle?: string
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
  const { homePageTitle, settings, post, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PostPage
            homePageTitle={homePageTitle}
            preview={preview}
            settings={settings}
            post={post}
          />
        }
      >
        <PreviewPostPage
          token={token}
          post={post}
          settings={settings}
          homePageTitle={homePageTitle}
        />
      </PreviewSuspense>
    )
  }

  return (
    <PostPage
      homePageTitle={homePageTitle}
      preview={preview}
      settings={settings}
      post={post}
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
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const paths = await getPostPaths()

  return {
    paths: paths?.map((slug) => resolveHref('post', slug)) || [],
    fallback: 'blocking',
  }
}
