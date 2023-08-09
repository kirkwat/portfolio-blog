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
          <Link
            href={value?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline opacity-80 transition-all duration-300 hover:text-pink-300 hover:opacity-100"
          >
            {children}
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
            className={`my-5 ${value.fullSize ? '' : 'mx-auto w-2/3 sm:w-1/2'}`}
          >
            <ImageBox image={value} alt={value.alt || value.caption} />
            {value?.caption &&
              (value?.link ? (
                <Link
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-normal break-words font-serif text-sm underline opacity-80 transition-all duration-300 hover:text-pink-300 hover:opacity-100"
                >
                  {value.caption}
                </Link>
              ) : (
                <p className="whitespace-normal break-words font-serif text-sm opacity-80">
                  {value.caption}
                </p>
              ))}
          </div>
        )
      },
      multipleImages: ({
        value: { images, imageHeight },
      }: {
        value: {
          images: (Image & {
            alt?: string
            caption?: string
            link?: string
          })[]
          imageHeight?: 'short' | 'normal' | 'tall'
        }
      }) => {
        const getImageGridClass = (numImages: number) => {
          switch (numImages) {
            case 2:
              return 'grid-cols-2'
            case 3:
              return 'grid-cols-3'
          }
        }

        return (
          value &&
          images.length > 0 && (
            <div
              className={`my-5 grid gap-2 ${getImageGridClass(images.length)}`}
            >
              {images.map((image, key) => (
                <div key={key}>
                  <div
                    className={`overflow-hidden ${
                      imageHeight === 'short' ? 'h-48' : ''
                    } ${imageHeight === 'normal' ? 'h-72' : ''} ${
                      imageHeight === 'tall' ? 'h-96' : ''
                    }`}
                  >
                    <ImageBox
                      image={image}
                      alt={image.alt || image.caption}
                      classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
                    />
                  </div>
                  {image?.caption &&
                    (image?.link ? (
                      <Link
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-normal break-words font-serif text-sm underline  opacity-80 transition-all duration-300 hover:text-pink-300 hover:opacity-100"
                      >
                        {image.caption}
                      </Link>
                    ) : (
                      <p className="whitespace-normal break-words font-serif text-sm opacity-80">
                        {image.caption}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          )
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
