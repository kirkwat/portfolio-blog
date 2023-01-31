import { format, parseISO } from 'date-fns'
import type { PostPayload, ShowcasePost } from 'types'

import ImageBox from '../../shared/ImageBox'

interface PostCardProps {
  post: PostPayload | ShowcasePost
}

export function PostListCard(props: PostCardProps) {
  const { post } = props

  return (
    <div className="relative h-full overflow-hidden rounded bg-white shadow-md duration-100 ease-in hover:shadow-xl md:h-96">
      <div className="w-full">
        <ImageBox
          image={post.coverImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="relative mt-1 flex w-full flex-col justify-between p-3 xl:mt-0">
        <div className="mb-2 flex flex-row justify-between">
          {/* Title */}
          <div className="text-xl font-extrabold tracking-tight md:text-2xl">
            {post.title}
          </div>
          {/* Date */}
          <div className="text-center text-lg md:text-right">
            <time dateTime={post?.date}>
              {format(parseISO(post?.date), 'LLLL	d, yyyy')}
            </time>
          </div>
        </div>
        {/* Excerpt  */}
        <p className="font-serif text-gray-500 line-clamp-5 lg:line-clamp-6 xl:line-clamp-4 2xl:line-clamp-2">
          {post.excerpt}
        </p>
      </div>
      {/* Tags */}
      <div className="absolute top-0 ml-4 mt-4 flex flex-row gap-x-2">
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
