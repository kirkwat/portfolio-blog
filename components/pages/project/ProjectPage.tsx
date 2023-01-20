import Head from 'next/head'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ProjectPayload, SettingsPayload } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import { Header } from '../../shared/Header'
import ImageBox from '../../shared/ImageBox'
import Layout from '../../shared/Layout'
import ScrollUp from '../../shared/ScrollUp'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export default function ProjectPage({
  project,
  settings,
  homePageTitle,
  preview,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    tags,
    title,
  } = project || {}

  const startYear = new Date(duration?.start).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  if (!project?.slug && !preview) {
    notFound()
  }

  return (
    <>
      <Head>
        <ProjectPageHead project={project} title={homePageTitle} />
      </Head>

      <Layout settings={settings} preview={preview}>
          <article className="mb-20 space-y-6">
            {/* Header */}
            <Header title={title} description={overview} />

            <div className="rounded-md border">
              {/* Image  */}
              <ImageBox
                image={coverImage}
                alt={`Cover image for ${title}`}
                classesWrapper="relative aspect-[16/9]"
              />

              <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
                {/* Duration */}
                {!!(startYear && endYear) && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Duration</div>
                    <div className="text-md md:text-lg">{`${startYear} -  ${endYear}`}</div>
                  </div>
                )}

                {/* Client */}
                {client && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Client</div>
                    <div className="text-md md:text-lg">{client}</div>
                  </div>
                )}

                {/* Site */}
                {site && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Site</div>
                    {site && (
                      <Link
                        target="_blank"
                        className="text-md break-words md:text-lg"
                        href={site}
                      >
                        {site}
                      </Link>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm">Tags</div>
                  <div className="text-md flex flex-row flex-wrap md:text-lg">
                    {tags?.map((tag, key) => (
                      <div key={key} className="mr-1 break-words ">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-xl text-gray-600"
                value={description}
              />
            )}
            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </article>
          <div className="absolute left-0 w-screen border-t" />
      </Layout>
    </>
  )
}
