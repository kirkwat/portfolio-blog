import { PortableText, PortableTextComponents } from '@portabletext/react'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import Link from 'next/link'
import { Image, PortableTextBlock } from 'sanity'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link href={value?.href} target="_blank" rel="noopener noreferrer">
            <div className="text-gray-600 underline decoration-gray-600 transition hover:opacity-50">
              {children}
            </div>
          </Link>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & {
          alt?: string
          caption?: string
          link?: string
          fullSize?: boolean
        }
      }) => {
        return (
          <div
            className={`my-5 space-y-2 ${
              value.fullSize ? '' : 'mx-auto w-2/3 sm:w-1/2'
            }`}
          >
            <ImageBox image={value} alt={value.alt || value.caption} />
            {value?.caption &&
              (value?.link ? (
                <Link
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="font-serif text-sm text-gray-600 underline decoration-gray-600 transition hover:opacity-50">
                    {value.caption}
                  </div>
                </Link>
              ) : (
                <div className="font-serif text-sm text-gray-600">
                  {value.caption}
                </div>
              ))}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
