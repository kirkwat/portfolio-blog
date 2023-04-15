import { SiteMeta } from 'components/global/SiteMeta'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type {
  ProjectListPagePayload,
  SettingsPayload,
  ShowcaseProject,
} from 'types'

import { ProjectListCard } from './ProjectListCard'

export interface ProjectListPageProps {
  projects?: ShowcaseProject[]
  settings?: SettingsPayload
  homePageTitle?: string
  projectListPage?: ProjectListPagePayload
  preview?: boolean
}

export function ProjectListPage({
  projects,
  settings,
  homePageTitle,
  projectListPage,
  preview,
}: ProjectListPageProps) {
  const { pageTitle = 'Projects', subtitle = 'Check out my latest projects' } =
    projectListPage ?? {}

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={subtitle ? subtitle : ''}
        image={settings?.ogImage}
        title={pageTitle}
      />

      <Layout settings={settings} preview={preview}>
        <div className="pb-7 lg:pb-32">
          {/* Header */}
          <Header centered title={pageTitle} subtitle={subtitle} />
          {/* List projects */}
          {projects && projects.length > 0 && (
            <div className="grid justify-center gap-10 sm:gap-5">
              {projects.map((project, key) => {
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

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
