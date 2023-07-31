import { ShowcasePost, ShowcaseProject } from 'types'

import ImageBox from './ImageBox'

interface ContentNavigationProps {
  content: ShowcasePost[] | ShowcaseProject[]
  slug: string
  contentType?: 'post' | 'project'
}

const contentTypeMap = {
  post: { title: 'Post', slug: 'posts' },
  project: { title: 'Project', slug: 'projects' },
}

export default function ContentNavigation({
  content,
  slug,
  contentType,
}: ContentNavigationProps) {
  const currentContentIndex = content.findIndex(
    (content: ShowcasePost | ShowcaseProject) => content.slug === slug
  )

  const nextContent = content[currentContentIndex + 1]
  const prevContent = content[currentContentIndex - 1]

  return (
    <div className="mb-16 mt-12 grid w-full gap-4 sm:grid-cols-2 sm:gap-6">
      {prevContent && (
        <a
          href={`/${contentTypeMap[contentType].slug}/${prevContent.slug}`}
          className={`group flex cursor-pointer flex-col overflow-hidden rounded border ${
            nextContent ? 'sm:col-start-1' : 'sm:col-span-2 sm:flex-row-reverse'
          }`}
        >
          <div className="aspect-video overflow-hidden bg-white">
            <ImageBox
              image={prevContent.coverImage}
              alt={`Cover image from ${prevContent.title}`}
              classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
            />
          </div>
          <div className="grow p-4">
            <p className="mb-1 opacity-70">
              <span>&larr; </span>
              <span className="font-serif text-sm group-hover:underline">
                Previous {contentTypeMap[contentType].title}
              </span>
            </p>
            <p className="line-clamp-1 text-ellipsis text-lg font-medium group-hover:underline">
              {prevContent.title}
            </p>
          </div>
        </a>
      )}
      {nextContent && (
        <a
          href={`/${contentTypeMap[contentType].slug}/${nextContent.slug}`}
          className={`group flex cursor-pointer flex-col overflow-hidden rounded-md border ${
            prevContent ? 'sm:col-start-2' : 'sm:col-span-2 sm:flex-row'
          }`}
        >
          <div className="aspect-video overflow-hidden bg-white">
            <ImageBox
              image={nextContent.coverImage}
              alt={`Cover image from ${nextContent.title}`}
              classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
            />
          </div>
          <div className="flex grow flex-col p-4">
            <p className="mb-1 ml-auto opacity-70">
              <span className="font-serif text-sm group-hover:underline">
                Next {contentTypeMap[contentType].title}
              </span>
              <span> &rarr;</span>
            </p>
            <p className="ml-auto line-clamp-1 text-lg font-medium group-hover:underline">
              {nextContent.title}
            </p>
          </div>
        </a>
      )}
    </div>
  )
}
