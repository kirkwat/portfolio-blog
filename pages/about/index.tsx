import AboutPage from 'components/pages/about/AboutPage'
import { getAboutPage, getHomePageTitle, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { AboutPagePayload, SettingsPayload } from 'types'

interface PageProps {
  settings: SettingsPayload
  homePageTitle?: string
  aboutPage: AboutPagePayload
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function PostsPage(props: PageProps) {
  const { settings, homePageTitle, aboutPage, token } = props

  return (
    <AboutPage
      aboutPage={aboutPage}
      settings={settings}
      homePageTitle={homePageTitle}
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
  const [settings, homePageTitle, aboutPage] = await Promise.all([
    getSettings({ token }),
    getHomePageTitle({ token }),
    getAboutPage({ token }),
  ])

  return {
    props: {
      settings,
      homePageTitle,
      aboutPage,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}
