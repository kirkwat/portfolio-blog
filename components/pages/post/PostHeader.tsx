import { format, parseISO } from 'date-fns'
import type { PostPayload } from 'types'

import CoverImage from '../../shared/CoverImage'

export default function PostHeader(
  props: Pick<PostPayload, 'title' | 'coverImage' | 'date' | 'slug'>
) {
  const { title, coverImage, date, slug } = props
  return (
    <>
      <h1 className="mb-2 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none">
        {title}
      </h1>
      <div className="mb-4 text-center text-lg md:mb-6 md:text-left">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>
      <div className="mb-12">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
    </>
  )
}
