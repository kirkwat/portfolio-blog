import { format, parseISO } from 'date-fns'
import type { PostPayload, ShowcasePost } from 'types'

import ImageBox from '../../shared/ImageBox'

interface PostCardProps {
  post: PostPayload | ShowcasePost
  secondaryBackground?: boolean
}

export function PostListCard(props: PostCardProps) {
  const { post, secondaryBackground } = props

  return (
    <div
      className={`relative overflow-hidden rounded-lg p-2 sm:flex sm:flex-row ${
        secondaryBackground ? 'hover:bg-gray-100' : 'hover:bg-gray-50'
      }`}
    >
      <div className="aspect-video overflow-hidden rounded-lg border bg-white sm:w-1/2">
        <ImageBox
          image={post.coverImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
        />
      </div>
      <div className="px-2 sm:w-1/2 sm:pl-3 sm:pr-0">
        {/* Title */}
        <div className="text-xl font-extrabold tracking-tight sm:mb-1 md:text-3xl">
          {post.title}
        </div>
        {/* Excerpt  */}
        <p className="font-serif text-gray-500 md:text-lg">{post.excerpt}</p>
        {/* Date */}
        <div className="md:text-lg">
          <time dateTime={post?.date}>
            {format(parseISO(post?.date), 'LLLL	d, yyyy')}
          </time>
        </div>
      </div>
      {/* Tags */}
      <div className="absolute top-0 mx-4 mt-4 flex flex-row flex-wrap gap-2">
        {post.tags?.map((tag, key) => (
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
