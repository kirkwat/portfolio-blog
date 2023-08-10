import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { useState } from 'react'

interface ImageBoxProps {
  image?: { asset?: any }
  alt?: string
  cover?: boolean
  classesWrapper?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  cover = false,
  classesWrapper,
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url()

  const [aspectRatio, setAspectRatio] = useState(1)

  const handleImageLoad = (event) => {
    setAspectRatio(event.target.naturalWidth / event.target.naturalHeight)
  }

  return (
    <div
      className={`relative ${classesWrapper}`}
      style={{ paddingBottom: `${100 / aspectRatio}%` }}
    >
      {imageUrl && (
        <Image
          alt={alt}
          src={imageUrl}
          className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full ${
            cover ? 'object-cover' : 'object-contain'
          }`}
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          onLoad={handleImageLoad}
        />
      )}
    </div>
  )
}
