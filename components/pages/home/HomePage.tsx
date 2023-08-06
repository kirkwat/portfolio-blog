import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { ContentListCard } from 'components/pages/content/ContentListCard'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import { HomeHeader } from './HomeHeader'

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
    overview,
    postTitle = 'Blogs',
    postSubtitle = 'My latest blogs',
    projectTitle = 'Projects',
    projectSubtitle = 'My latest projects',
  } = page ?? {}

  return (
    <>
      <SiteMeta
        description={overview ? toPlainText(overview) : ''}
        image={settings?.ogImage}
        title={title || ''}
      />

      <Layout settings={settings} preview={preview}>
        {/* Header */}
        <HomeHeader page={page} settings={settings} />
        <section className="bg-gray-50 pb-7 pt-6 lg:pb-32 lg:pt-24">
          <div className="container mx-auto px-4">
            {/* Showcase posts */}
            <Header centered title={postTitle} subtitle={postSubtitle} />
            {showcasePosts && showcasePosts.length > 0 && (
              <div className="grid justify-center gap-4">
                {showcasePosts.map((post, key) => {
                  const href = resolveHref(post._type, post.slug)
                  if (!href) {
                    return null
                  }
                  return (
                    <Link key={key} href={href}>
                      <ContentListCard content={post} secondaryBackground />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
        <section className="pb-7 pt-6 lg:pb-32 lg:pt-24">
          <div className="container mx-auto px-4">
            {/* Showcase projects */}
            <Header centered title={projectTitle} subtitle={projectSubtitle} />
            {showcaseProjects && showcaseProjects.length > 0 && (
              <div className="grid justify-center gap-4">
                {showcaseProjects.map((project, key) => {
                  const href = resolveHref(project._type, project.slug)
                  if (!href) {
                    return null
                  }
                  return (
                    <Link key={key} href={href}>
                      <ContentListCard content={project} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  )
}
