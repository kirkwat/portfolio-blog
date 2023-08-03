import { ContentListPage } from 'components/pages/content/ContentListPage'
import {
  getHomePageTitle,
  getPostListPage,
  getPosts,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { PostListPagePayload, SettingsPayload, ShowcaseContent } from 'types'

interface PageProps {
  posts: ShowcaseContent[]
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
    <ContentListPage
      contentList={posts}
      contentListHeader={postListPage}
      settings={settings}
      homePageTitle={homePageTitle}
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
    revalidate: 1,
  }
}
