import { format, parseISO } from 'date-fns'
import type { PostPayload, ShowcasePost } from 'types'

import ImageBox from '../../shared/ImageBox'

interface PostCardProps {
  post: PostPayload | ShowcasePost
}

export function ShowcasePostCard(props: PostCardProps) {
  const { post } = props

  return (
    <div className="relative h-full overflow-hidden rounded border bg-white shadow-md duration-100 ease-in hover:shadow-xl md:h-96">
      <div className="h-[10.625rem] overflow-hidden border-b">
        <ImageBox
          image={post.coverImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
          card
        />
      </div>
      <div className="relative flex w-full flex-col justify-between p-3 xl:mt-0">
        {/* Title */}
        <div className="text-xl font-extrabold tracking-tight md:text-2xl">
          {post.title}
        </div>
        {/* Date */}
        <div className="text-lg">
          <time dateTime={post?.date}>
            {format(parseISO(post?.date), 'LLLL	d, yyyy')}
          </time>
        </div>
        {/* Excerpt  */}
        <p className="font-serif text-gray-500 line-clamp-5 lg:line-clamp-6 xl:line-clamp-4 2xl:line-clamp-2">
          {post.excerpt}
        </p>
      </div>
      {/* Tags */}
      <div className="absolute top-0 mx-4 mt-4 flex flex-row flex-wrap gap-2">
        {post.tags?.map((tag, key) => (
          <div
            className="rounded-full bg-white px-3 py-0.5 text-sm font-medium lowercase opacity-70 md:text-lg"
            key={key}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  )
}
