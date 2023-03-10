import { ServerError } from 'components/pages/ServerError'
import { getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { SettingsPayload } from 'types'

interface PageProps {
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

export default function ServerErrorPage(props: PageProps) {
  const { settings, preview, token } = props

  return <ServerError settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings] = await Promise.all([getSettings({ token })])

  return {
    props: {
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}
