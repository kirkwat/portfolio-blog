//TODO add page head

import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { ProjectPayload, SettingsPayload } from 'types'

import { ProjectListItem } from './ProjectListItem'

export interface ProjectListPageProps {
  projects?: ProjectPayload[]
  settings?: SettingsPayload
  preview?: boolean
}

export function ProjectListPage({
  projects,
  settings,
  preview,
}: ProjectListPageProps) {
  return (
    <Layout settings={settings} preview={preview}>
      <div className="space-y-20">
        {/* Header */}
        <Header centered title="Project List" />
        {/* Showcase projects */}
        {projects && projects.length > 0 && (
          <div className="mx-auto max-w-[100rem] rounded-md border">
            {projects.map((project, key) => {
              const href = resolveHref(project._type, project.slug)
              if (!href) {
                return null
              }
              return (
                <Link key={key} href={href}>
                  <ProjectListItem project={project} odd={key % 2} />
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
