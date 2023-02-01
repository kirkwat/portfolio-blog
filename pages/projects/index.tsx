import { ProjectListPage } from 'components/pages/project/ProjectListPage'
import { getProjectListPage, getProjects, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { ProjectListPagePayload, SettingsPayload, ShowcaseProject } from 'types'

interface PageProps {
  projects: ShowcaseProject[]
  settings: SettingsPayload
  projectListPage: ProjectListPagePayload
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectsPage(props: PageProps) {
  const { projects, settings, projectListPage, token } = props

  return (
    <ProjectListPage
      projects={projects}
      settings={settings}
      projectListPage={projectListPage}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, projects = [], projectListPage] = await Promise.all([
    getSettings({ token }),
    getProjects({ token }),
    getProjectListPage({ token }),
  ])

  return {
    props: {
      projects,
      settings,
      projectListPage,
      preview,
      token: previewData.token ?? null,
    },
  }
}
