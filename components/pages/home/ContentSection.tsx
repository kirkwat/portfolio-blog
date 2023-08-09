import ImageBox from 'components/shared/ImageBox'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload } from 'types'

export interface PostSectionProps {
  contentSection: HomePagePayload['contentSection']
}

export function ContentSection({ contentSection }: PostSectionProps) {
  const { showcaseContent, readMoreButton } = contentSection

  return (
    <section className="my-2 border-y border-black">
      <div className="grid divide-y divide-black sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {showcaseContent?.map((content, key) => {
          const href = resolveHref(content._type, content.slug)
          if (!href) {
            return null
          }
          return (
            <div key={key} className="flex flex-col justify-between p-4">
              <div
                className={`mb-3 flex flex-col gap-3 ${
                  key % 2 === 0 ? '' : 'sm:flex-col-reverse'
                }`}
              >
                <div>
                  <h3 className="line-clamp-3 text-2xl font-medium italic tracking-tight">
                    {content.title}
                  </h3>
                  <p className="line-clamp-3 font-serif text-sm opacity-80">
                    {content.excerpt}
                  </p>
                </div>
                <div className="aspect-video overflow-hidden rounded bg-white sm:aspect-[16/12]">
                  <ImageBox
                    image={content.coverImage}
                    alt={`Cover image for ${content.title}`}
                    classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
                  />
                </div>
              </div>
              <Link
                href={href}
                className="w-fit select-none rounded bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-pink-200 hover:text-black hover:shadow-[-2px_-2px_0px_black]"
              >
                {readMoreButton}
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
