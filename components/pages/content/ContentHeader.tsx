import { format, parseISO } from 'date-fns'
import type { PostPayload, ProjectPayload } from 'types'

export default function ContentHeader(
  props: Pick<PostPayload | ProjectPayload, 'title' | 'date' | 'tags'>
) {
  const { title, date, tags } = props
  return (
    <>
      <h1 className="mb-4 text-center text-4xl tracking-tighter md:text-5xl">
        {title}
      </h1>
      <div className="mb-4 text-center text-lg italic opacity-70">
        <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
      </div>

      <div className="mb-6 flex flex-row flex-wrap place-content-center">
        {tags?.map((tag, key) => (
          <div
            key={key}
            className="mr-1 break-words text-lg lowercase  opacity-70"
          >
            #{tag}
          </div>
        ))}
      </div>
    </>
  )
}
