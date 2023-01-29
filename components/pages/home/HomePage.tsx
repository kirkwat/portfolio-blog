import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Head from 'next/head'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import { PostListCard } from '../post/PostListCard'
import { ProjectListCard } from '../project/ProjectListCard'
import { HomeHeader } from './HomeHeader'
import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const {
    showcasePosts,
    showcaseProjects,
    title = 'Personal website',
  } = page ?? {}

  return (
    <>
      <Head>
        <HomePageHead page={page} settings={settings} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div className="mb-20 space-y-10">
          {/* Header */}
          {title && <HomeHeader page={page} settings={settings} />}
          {/* Showcase projects */}
          <div className="text-center text-2xl font-bold">My Top Projects</div>
          {showcaseProjects && showcaseProjects.length > 0 && (
            <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
              {showcaseProjects.map((project, key) => {
                const href = resolveHref(project._type, project.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <ProjectListCard project={project} />
                  </Link>
                )
              })}
            </div>
          )}
          {/* Showcase posts */}
          <div className="text-center text-2xl font-bold">
            My Top Blog Posts
          </div>
          {showcasePosts && showcasePosts.length > 0 && (
            <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
              {showcasePosts.map((post, key) => {
                const href = resolveHref(post._type, post.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <PostListCard post={post} />
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
