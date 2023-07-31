import { format, parseISO } from 'date-fns'
import type { PostPayload } from 'types'

import CoverImage from '../../shared/CoverImage'

export default function PostHeader(
  props: Pick<PostPayload, 'title' | 'coverImage' | 'date' | 'slug' | 'tags'>
) {
  const { title, coverImage, date, tags, slug } = props
  return (
    <>
      <h1 className="mb-4 text-center text-5xl tracking-tighter md:text-6xl">
        {title}
      </h1>
      <div className="mb-4 text-center text-lg italic opacity-70">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>

      <div className="mb-6 flex flex-row flex-wrap place-content-center font-serif text-lg uppercase tracking-tight opacity-70">
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
