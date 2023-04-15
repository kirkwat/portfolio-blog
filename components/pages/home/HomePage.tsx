import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import { ShowcasePostCard } from '../post/ShowcasePostCard'
import { ShowcaseCard } from '../project/ShowcaseCard'
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
    postTitle = 'Blogs',
    postSubtitle = 'My latest blogs',
    projectTitle = 'Projects',
    projectSubtitle = 'My latest projects',
  } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} home>
        {/* Header */}
        <HomeHeader page={page} settings={settings} />
        <section className="bg-gray-50 pt-6 pb-7 lg:pt-24 lg:pb-32">
          <div className="container mx-auto px-4">
            {/* Showcase posts */}
            <Header centered title={postTitle} subtitle={postSubtitle} />
            {showcasePosts && showcasePosts.length > 0 && (
              <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
                {showcasePosts.map((post, key) => {
                  const href = resolveHref(post._type, post.slug)
                  if (!href) {
                    return null
                  }
                  return (
                    <Link
                      key={key}
                      href={href}
                      className={
                        showcasePosts.length === 1 ? 'lg:col-start-2' : ''
                      }
                    >
                      <ShowcasePostCard post={post} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
        <section className="pt-6 pb-7 lg:pt-24 lg:pb-32">
          <div className="container mx-auto px-4">
            {/* Showcase projects */}
            <Header centered title={projectTitle} subtitle={projectSubtitle} />
            {showcaseProjects && showcaseProjects.length > 0 && (
              <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
                {showcaseProjects.map((project, key) => {
                  const href = resolveHref(project._type, project.slug)
                  if (!href) {
                    return null
                  }
                  return (
                    <Link
                      key={key}
                      href={href}
                      className={
                        showcaseProjects.length === 1 ? 'lg:col-start-2' : ''
                      }
                    >
                      <ShowcaseCard project={project} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
      </Layout>
    </>
  )
}
