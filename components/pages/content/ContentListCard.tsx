import { format, parseISO } from 'date-fns'
import type { PostPayload, ProjectPayload, ShowcaseContent } from 'types'

import ImageBox from '../../shared/ImageBox'

interface ContentListCardProps {
  content: PostPayload | ProjectPayload | ShowcaseContent
  secondaryBackground?: boolean
}

export function ContentListCard(props: ContentListCardProps) {
  const { content, secondaryBackground } = props

  return (
    <div
      className={`group relative overflow-hidden rounded-lg p-2 sm:flex sm:aspect-[32/9] sm:flex-row ${
        secondaryBackground
          ? 'hover:bg-gray-100 focus:bg-gray-100'
          : 'hover:bg-gray-50 focus:bg-gray-50'
      }`}
    >
      <div className="aspect-video overflow-hidden rounded-lg border bg-white sm:w-1/2">
        <ImageBox
          image={content.coverImage}
          alt={`Cover image for ${content.title}`}
          classesWrapper="transition-all duration-200 group-hover:scale-105 group-focus:scale-105 absolute top-0 left-0 right-0 bottom-0 h-full w-full"
        />
      </div>
      <div className="px-2 sm:w-1/2 sm:pl-3 sm:pr-0">
        <div className="text-xl tracking-tighter sm:mb-1 md:text-3xl">
          {content.title}
        </div>
        <div className="italic opacity-80 md:text-lg">
          <time dateTime={content?.date}>
            {format(parseISO(content?.date), 'LLLL	d, yyyy')}
          </time>
        </div>
        <p className="font-serif opacity-80 sm:line-clamp-2 lg:line-clamp-6 lg:text-lg">
          {content.excerpt}
        </p>
      </div>
      <div className="absolute top-0 mx-4 mt-4 flex flex-row flex-wrap gap-2">
        {content.tags?.map((tag, key) => (
          <div
            className="text-md rounded-full bg-white px-3 py-0.5 font-medium lowercase opacity-70 md:text-lg"
            key={key}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  )
}
