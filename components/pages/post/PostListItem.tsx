import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { PostPayload } from 'types'

interface PostsProps {
  post: PostPayload
}

export function PostListItem(props: PostsProps) {
  const { post } = props

  return (
    <div className="relative h-full overflow-hidden rounded shadow-md duration-100 ease-in hover:shadow-xl">
      <div className="w-full">
        <ImageBox
          image={post.coverImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="relative mt-1 flex w-full flex-col justify-between p-3 xl:mt-0">
        {/* Title */}
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {post.title}
        </div>
        {/* Overview  */}
        <div className="font-serif text-gray-500">{post.excerpt}</div>
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
