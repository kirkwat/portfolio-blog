//TODO add page head

import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { PostPayload, SettingsPayload } from 'types'

import { PostListItem } from './PostListItem'

export interface PostListPageProps {
  posts?: PostPayload[]
  settings?: SettingsPayload
  preview?: boolean
}

export function PostListPage({ posts, settings, preview }: PostListPageProps) {
  return (
    <Layout settings={settings} preview={preview}>
      <div className="mb-20 space-y-10">
        {/* Header */}
        <Header centered title="Blogs" />
        {/* Showcase posts */}
        {posts && posts.length > 0 && (
          <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, key) => {
              const href = resolveHref(post._type, post.slug)
              if (!href) {
                return null
              }
              return (
                <Link key={key} href={href}>
                  <PostListItem post={post} />
                </Link>
              )
            })}
          </div>
        )}
        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
      </div>
    </Layout>
  )
}
