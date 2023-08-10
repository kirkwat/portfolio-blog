import { format, parseISO } from 'date-fns'
import type { PostPayload, ProjectPayload } from 'types'

export default function ContentHeader(
  props: Pick<PostPayload | ProjectPayload, 'title' | 'date' | 'tags'>
) {
  const { title, date, tags } = props
  return (
    <div className="mb-5">
      <h1 className="mb-4 mt-8 text-center text-4xl font-medium italic tracking-tighter md:text-5xl">
        {title}
      </h1>
      <div className="mb-3 text-center text-lg italic opacity-80">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>
      <div className="mb-3 flex flex-row flex-wrap place-content-center">
        {tags?.map((tag, key) => (
          <div
            key={key}
            className="mr-1 break-words text-lg lowercase  opacity-80"
          >
            #{tag}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 w-1/2 border-t border-black" />
    </div>
  )
}
