import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { ShowcaseContent } from 'types'

import ImageBox from '../../shared/ImageBox'

interface ContentNavigationProps {
  content: ShowcaseContent[]
  slug: string
}

const contentTypeMap = {
  post: 'Post',
  project: 'Project',
}

export default function ContentNavigation({
  content,
  slug,
}: ContentNavigationProps) {
  const currentContentIndex = content.findIndex(
    (content: ShowcaseContent) => content.slug === slug
  )

  const nextContent = content[currentContentIndex + 1]
  const nextContentHref = nextContent
    ? resolveHref(nextContent._type, nextContent.slug)
    : ''

  const prevContent = content[currentContentIndex - 1]
  const prevContentHref = prevContent
    ? resolveHref(prevContent._type, prevContent.slug)
    : ''

  return (
    <div className="mb-6 mt-12 grid w-full gap-4 sm:grid-cols-2 sm:gap-6">
      {prevContentHref && (
        <Link
          href={prevContentHref}
          className={`group flex cursor-pointer flex-col overflow-hidden rounded border hover:border-pink-300 ${
            nextContentHref
              ? 'sm:col-start-1'
              : 'sm:col-span-2 sm:flex-row-reverse'
          }`}
        >
          <div
            className={`aspect-video overflow-hidden bg-white group-hover:border-pink-300 ${
              nextContentHref ? 'border-b' : 'border-l'
            }`}
          >
            <ImageBox
              image={prevContent.coverImage}
              alt={`Cover image from ${prevContent.title}`}
              classesWrapper="transition-all duration-200 group-hover:scale-105 absolute top-0 left-0 right-0 bottom-0 h-full w-full"
            />
          </div>
          <div className="grow p-4">
            <p className="mb-1 opacity-80">
              <span>&larr; </span>
              <span className="font-serif text-sm decoration-pink-300 group-hover:underline">
                Previous {contentTypeMap[prevContent._type]}
              </span>
            </p>
            <p className="line-clamp-1 text-ellipsis text-lg font-medium decoration-pink-300 group-hover:underline">
              {prevContent.title}
            </p>
          </div>
        </Link>
      )}
      {nextContentHref && (
        <Link
          href={nextContentHref}
          className={`group flex cursor-pointer flex-col overflow-hidden rounded-md border hover:border-pink-300 ${
            prevContentHref ? 'sm:col-start-2' : 'sm:col-span-2 sm:flex-row'
          }`}
        >
          <div
            className={`aspect-video overflow-hidden bg-white group-hover:border-pink-300 ${
              prevContentHref ? 'border-b' : 'border-r'
            }`}
          >
            <ImageBox
              image={nextContent.coverImage}
              alt={`Cover image from ${nextContent.title}`}
              classesWrapper="transition-all duration-200 group-hover:scale-105 absolute top-0 left-0 right-0 bottom-0 h-full w-full"
            />
          </div>
          <div className="flex grow flex-col p-4">
            <p className="mb-1 ml-auto opacity-80">
              <span className="font-serif text-sm decoration-pink-300 group-hover:underline">
                Next {contentTypeMap[nextContent._type]}
              </span>
              <span> &rarr;</span>
            </p>
            <p className="ml-auto line-clamp-1 text-lg font-medium decoration-pink-300 group-hover:underline">
              {nextContent.title}
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}
