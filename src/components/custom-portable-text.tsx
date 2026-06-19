import Link from 'next/link';

import type { PathSegment } from '@sanity/client/csm';
import {
  PortableText,
  type InferStrictComponents,
  type InferValue,
  type SanityQueries,
} from 'next-sanity';

import ImageBox from '@/components/image-box';
import { TimelineSection } from '@/components/timeline-section';
import { cn } from '@/lib/utils';

export function CustomPortableText({
  id,
  type,
  path,
  paragraphClasses,
  value,
  imageAltFallback,
}: {
  id: string | null;
  type: string | null;
  path: PathSegment[];
  paragraphClasses?: string;
  value: InferValue<SanityQueries[keyof SanityQueries]>;
  /** Contextual alt text (e.g. derived from the page title) for images without their own alt/caption. */
  imageAltFallback?: string;
}) {
  const components = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        if (!value?.href) return children;

        return (
          <Link
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline opacity-80 transition-all duration-300 hover:opacity-100"
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        return (
          <div
            className={cn('my-5', !value.fullSize && 'mx-auto w-2/3 sm:w-1/2')}
          >
            <ImageBox
              image={value}
              alt={value.alt || value.caption || imageAltFallback}
            />
            {value?.caption &&
              (value?.link ? (
                <Link
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-serif text-sm wrap-break-word whitespace-normal underline opacity-80 transition-all duration-300 hover:opacity-100"
                >
                  {value.caption}
                </Link>
              ) : (
                <p className="font-serif text-sm wrap-break-word whitespace-normal opacity-80">
                  {value.caption}
                </p>
              ))}
          </div>
        );
      },
      multipleImages: ({ value }) => {
        const { images, imageHeight } = value;
        const getImageGridClass = (numImages: number) => {
          switch (numImages) {
            case 2:
              return 'grid-cols-2';
            case 3:
              return 'grid-cols-3';
            default:
              return '';
          }
        };

        if (!images || images.length === 0) {
          return null;
        }

        return (
          <div
            className={cn('my-5 grid gap-2', getImageGridClass(images.length))}
          >
            {images.map((image) => (
              <div key={image._key}>
                <div
                  className={cn(
                    'overflow-hidden',
                    imageHeight === 'short' && 'h-48',
                    imageHeight === 'normal' && 'h-72',
                    imageHeight === 'tall' && 'h-96',
                  )}
                >
                  <ImageBox
                    image={image}
                    alt={image.alt || image.caption || imageAltFallback}
                    cover
                  />
                </div>
                {image?.caption &&
                  (image?.link ? (
                    <Link
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary font-serif text-sm wrap-break-word whitespace-normal underline opacity-80 transition-all duration-300 hover:opacity-100"
                    >
                      {image.caption}
                    </Link>
                  ) : (
                    <p className="font-serif text-sm wrap-break-word whitespace-normal opacity-80">
                      {image.caption}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items, _key } = value;
        return (
          <TimelineSection
            key={_key}
            id={id}
            type={type}
            path={[...path, { _key }, 'items']}
            timelines={items}
          />
        );
      },
    },
  } satisfies InferStrictComponents<typeof value>;

  return <PortableText components={components} value={value} />;
}
