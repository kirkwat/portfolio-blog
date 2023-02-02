import { getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { HomePagePayload, SettingsPayload } from 'types'

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

export default function ResumePage(props: PageProps) {
  const { settings } = props

  return (
    <div className="h-screen w-full">
      <iframe src={settings.resume} className="h-full w-full" />
    </div>
  )
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
