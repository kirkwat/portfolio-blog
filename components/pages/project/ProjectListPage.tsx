//TODO add page head

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
  projectListPage?: ProjectListPagePayload
  preview?: boolean
}

export function ProjectListPage({
  projects,
  settings,
  projectListPage,
  preview,
}: ProjectListPageProps) {
  const { pageTitle = 'Projects', subtitle = 'Check out my latest projects' } =
    projectListPage ?? {}

  return (
    <Layout settings={settings} preview={preview}>
      <div className="pb-7 lg:pb-32">
        {/* Header */}
        <Header centered title={pageTitle} subtitle={subtitle} />
        {/* List projects */}
        {projects && projects.length > 0 && (
          <div className="grid h-max gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, key) => {
              const href = resolveHref(project._type, project.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  key={key}
                  href={href}
                  className={projects.length === 1 ? 'lg:col-start-2' : ''}
                >
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
  )
}
