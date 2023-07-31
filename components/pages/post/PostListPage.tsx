import { SiteMeta } from 'components/global/SiteMeta'
import { ContentListCard } from 'components/shared/content/ContentListCard'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { PostListPagePayload, SettingsPayload, ShowcasePost } from 'types'

export interface PostListPageProps {
  posts?: ShowcasePost[]
  settings?: SettingsPayload
  homePageTitle?: string
  postListPage?: PostListPagePayload
  preview?: boolean
}

export function PostListPage({
  posts,
  settings,
  homePageTitle,
  postListPage,
  preview,
}: PostListPageProps) {
  const { pageTitle = 'Blogs', subtitle = 'Check out my latest blogs' } =
    postListPage ?? {}

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={subtitle ? subtitle : 'hello'}
        image={settings?.ogImage}
        title={pageTitle}
      />

      <Layout settings={settings} preview={preview}>
        <div className="pb-7 lg:pb-32">
          {/* Header */}
          <Header centered title={pageTitle} subtitle={subtitle} />
          {/* List posts */}
          {posts && posts.length > 0 && (
            <div className="grid justify-center gap-4">
              {posts.map((post, key) => {
                const href = resolveHref(post._type, post.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <ContentListCard content={post} />
                  </Link>
                )
              })}
            </div>
          )}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
