import { ProjectListPage } from 'components/pages/project/ProjectListPage'
import { getProjects, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { SettingsPayload, ShowcaseProject } from 'types'

interface PageProps {
  projects: ShowcaseProject[]
  settings: SettingsPayload
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
  const { projects, settings, token } = props

  return <ProjectListPage projects={projects} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, projects = []] = await Promise.all([
    getSettings({ token }),
    getProjects({ token }),
  ])

  return {
    props: {
      projects,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}
