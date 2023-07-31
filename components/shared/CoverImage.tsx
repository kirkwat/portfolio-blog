import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props

  const [aspectRatio, setAspectRatio] = useState(1)

  const handleImageLoad = (event) => {
    setAspectRatio(event.target.naturalWidth / event.target.naturalHeight)
  }

  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small relative', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      style={{
        paddingBottom: `${100 / aspectRatio}%`,
      }}
    >
      <Image
        alt={`Cover Image for ${title}`}
        src={urlForImage(source).url()}
        priority={priority}
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
        fill
        onLoad={handleImageLoad}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
