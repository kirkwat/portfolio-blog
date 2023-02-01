import { PostListPage } from 'components/pages/post/PostListPage'
import { getPostListPage, getPosts, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { PostListPagePayload, SettingsPayload, ShowcasePost } from 'types'

interface PageProps {
  posts: ShowcasePost[]
  settings: SettingsPayload
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
  const { posts, settings, postListPage, token } = props

  return (
    <PostListPage
      posts={posts}
      settings={settings}
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
  const [settings, posts = [], postListPage] = await Promise.all([
    getSettings({ token }),
    getPosts({ token }),
    getPostListPage({ token }),
  ])

  return {
    props: {
      posts,
      settings,
      postListPage,
      preview,
      token: previewData.token ?? null,
    },
  }
}
