import { SiteMeta } from 'components/global/SiteMeta'
import { ContentListCard } from 'components/pages/content/ContentListCard'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type {
  PostListPagePayload,
  ProjectListPagePayload,
  SettingsPayload,
  ShowcaseContent,
} from 'types'

export interface ContentListPageProps {
  contentList: ShowcaseContent[]
  contentListHeader: PostListPagePayload | ProjectListPagePayload
  settings?: SettingsPayload
  homePageTitle?: string
  preview?: boolean
}

export function ContentListPage({
  contentList,
  contentListHeader,
  settings,
  homePageTitle,
  preview,
}: ContentListPageProps) {
  const { pageTitle = 'Content', subtitle = 'Check out my content!' } =
    contentListHeader

  return (
    <>
      <SiteMeta
        baseTitle={homePageTitle}
        description={subtitle || ''}
        image={settings?.ogImage}
        title={pageTitle}
      />

      <Layout settings={settings} preview={preview}>
        <div className="mx-auto max-w-5xl">
          <Header centered title={pageTitle} subtitle={subtitle} />
          {contentList && contentList.length > 0 && (
            <div className="grid justify-center gap-4">
              {contentList.map((content, key) => {
                const href = resolveHref(content._type, content.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <ContentListCard content={content} />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}
