import { format, parseISO } from 'date-fns'
import type { PostPayload } from 'types'

import CoverImage from '../../shared/CoverImage'

export default function PostHeader(
  props: Pick<PostPayload, 'title' | 'coverImage' | 'date' | 'slug'>
) {
  const { title, coverImage, date, slug } = props
  return (
    <>
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
        {title}
      </h1>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
        </div>
      </div>
    </>
  )
}
