import { ProjectListPage } from 'components/pages/project/ProjectListPage'
import {
  getHomePageTitle,
  getProjectListPage,
  getProjects,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { ProjectListPagePayload, SettingsPayload, ShowcaseProject } from 'types'

interface PageProps {
  projects: ShowcaseProject[]
  settings: SettingsPayload
  homePageTitle?: string
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
  const { projects, settings, homePageTitle, projectListPage, token } = props

  return (
    <ProjectListPage
      projects={projects}
      settings={settings}
      homePageTitle={homePageTitle}
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
  const [settings, homePageTitle, projects = [], projectListPage] =
    await Promise.all([
      getSettings({ token }),
      getHomePageTitle({ token }),
      getProjects({ token }),
      getProjectListPage({ token }),
    ])

  return {
    props: {
      projects,
      settings,
      homePageTitle,
      projectListPage,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}
