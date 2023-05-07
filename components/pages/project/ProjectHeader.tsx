import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import type { ProjectPayload } from 'types'

import CoverImage from '../../shared/CoverImage'

export default function ProjectHeader(
  props: Pick<
    ProjectPayload,
    | 'title'
    | 'coverImage'
    | 'date'
    | 'slug'
    | 'tags'
    | 'site'
    | 'client'
    | 'duration'
  >
) {
  const { title, coverImage, date, tags, slug, site, client, duration } = props

  const startYear = new Date(duration?.start).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  return (
    <>
      <h1 className="mb-2 text-center text-5xl font-bold leading-tight tracking-tighter md:text-6xl md:leading-none">
        {title}
      </h1>
      <div className="mb-3 text-center text-lg">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>
      <div className="mb-3 flex flex-row flex-wrap place-content-center text-xl">
        {tags?.map((tag, key) => (
          <div key={key} className="mr-1 break-words">
            #{tag}
          </div>
        ))}
      </div>
      {client && (
        <div
          className={`mb-3 text-center text-xl ${
            site || startYear ? '' : 'mb-5'
          }`}
        >
          <span className="font-bold">Client: </span>
          {client}
        </div>
      )}
      {site && (
        <div className={`mb-3 text-center text-xl ${startYear ? '' : 'mb-5'}`}>
          <span className="font-bold">Site: </span>
          <Link href={site} target="_blank" rel="noopener noreferrer">
            {site}
          </Link>
        </div>
      )}
      {!!(startYear && endYear) && (
        <div className="mb-5 text-center text-xl">
          <span className="font-bold">Duration: </span>
          {`${startYear} -  ${endYear}`}
        </div>
      )}

      {/*<div className="mb-12">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>*/}
    </>
  )
}
