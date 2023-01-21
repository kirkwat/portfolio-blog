import { PostListPage } from 'components/pages/post/PostListPage'
import { getPosts, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { PostPayload, SettingsPayload } from 'types'

interface PageProps {
  posts: PostPayload[]
  settings: SettingsPayload
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
  const { posts, settings, token } = props

  return <PostListPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, posts = []] = await Promise.all([
    getSettings({ token }),
    getPosts({ token }),
  ])

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}
