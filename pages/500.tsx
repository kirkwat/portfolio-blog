import { ServerError } from 'components/pages/ServerError'
import { getHomePageTitle, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { SettingsPayload } from 'types'

interface PageProps {
  settings: SettingsPayload
  homePageTitle?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ServerErrorPage(props: PageProps) {
  const { settings, homePageTitle, preview, token } = props

  return <ServerError settings={settings} homePageTitle={homePageTitle} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, homePageTitle] = await Promise.all([
    getSettings({ token }),
    getHomePageTitle({ token }),
  ])

  return {
    props: {
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
  }
}
