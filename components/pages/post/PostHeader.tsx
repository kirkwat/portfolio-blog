import { format, parseISO } from 'date-fns'
import type { PostPayload } from 'types'

import CoverImage from '../../shared/CoverImage'

export default function PostHeader(
  props: Pick<PostPayload, 'title' | 'coverImage' | 'date' | 'slug' | 'tags'>
) {
  const { title, coverImage, date, tags, slug } = props
  return (
    <>
      <h1 className="mb-2 text-center text-5xl leading-tight tracking-tighter md:text-6xl md:leading-none">
        {title}
      </h1>
      <div className="mb-3 text-center text-lg italic text-gray-600 decoration-gray-600">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>

      <div className="mb-5 flex flex-row flex-wrap place-content-center text-xl uppercase tracking-tighter text-gray-600 decoration-gray-600">
        {tags?.map((tag, key) => (
          <div key={key} className="mr-1 break-words">
            #{tag}
          </div>
        ))}
      </div>

      {/*<div className="mb-12">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
        </div>*/}
    </>
  )
}
