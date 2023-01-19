//TODO add page head

import { Header } from 'components/shared/Header'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { ProjectsPayload } from 'types'

import { ProjectListItem } from './ProjectListItem'

export function ProjectListPage({ data }: { data: ProjectsPayload }) {
  const { projects } = data

  return (
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
  )
}
