import { PostListPage } from 'components/pages/post/PostListPage'
import {
  getHomePageTitle,
  getPostListPage,
  getPosts,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { PostListPagePayload, SettingsPayload, ShowcasePost } from 'types'

interface PageProps {
  posts: ShowcasePost[]
  settings: SettingsPayload
  homePageTitle?: string
  postListPage: PostListPagePayload
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function PostsPage(props: PageProps) {
  const { posts, settings, homePageTitle, postListPage, token } = props

  return (
    <PostListPage
      posts={posts}
      settings={settings}
      homePageTitle={homePageTitle}
      postListPage={postListPage}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, homePageTitle, posts = [], postListPage] = await Promise.all(
    [
      getSettings({ token }),
      getHomePageTitle({ token }),
      getPosts({ token }),
      getPostListPage({ token }),
    ]
  )

  return {
    props: {
      posts,
      settings,
      homePageTitle,
      postListPage,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 10,
  }
}
