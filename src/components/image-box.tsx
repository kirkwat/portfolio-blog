import Image from 'next/image';

import type { SanityImageSource } from '@sanity/image-url';

import { ImageBoxFallback } from '@/components/image-box-fallback';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';

interface ImageBoxProps {
  image?: SanityImageSource | null | undefined;
  alt?: string;
  cover?: boolean;
  classesWrapper?: string;
  'data-sanity'?: string;
}

/**
 * Derives the rendered aspect ratio from the Sanity asset `_ref`
 * (`image-<id>-<width>x<height>-<ext>`), adjusted by the crop the image URL
 * builder applies — so the wrapper can be sized server-side with zero CLS.
 */
function getImageAspectRatio(image: SanityImageSource | null | undefined) {
  if (!image || typeof image === 'string') {
    return undefined;
  }

  const asset = 'asset' in image ? image.asset : image;
  if (!asset || typeof asset !== 'object') {
    return undefined;
  }

  const ref =
    '_ref' in asset && typeof asset._ref === 'string'
      ? asset._ref
      : '_id' in asset && typeof asset._id === 'string'
        ? asset._id
        : undefined;
  const match = ref && /^image-\w+-(\d+)x(\d+)-\w+$/.exec(ref);
  if (!match) {
    return undefined;
  }

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!(width > 0) || !(height > 0)) {
    return undefined;
  }

  // The image URL builder serves the cropped rect, so the effective ratio must
  // account for the crop (fractions of the full image cut from each edge).
  const crop = 'crop' in image ? image.crop : undefined;
  if (crop && typeof crop === 'object') {
    const croppedWidth = width * (1 - (crop.left ?? 0) - (crop.right ?? 0));
    const croppedHeight = height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0));
    if (croppedWidth > 0 && croppedHeight > 0) {
      return croppedWidth / croppedHeight;
    }
  }

  return width / height;
}

/**
 * Two modes:
 * - `cover` — fills the parent box (which defines the shape, e.g. `aspect-video
 *   overflow-hidden`) and crops via object-cover. No ratio needed.
 * - default — standalone image sized by its intrinsic (crop-aware) aspect ratio,
 *   rendered with object-contain.
 */
export default function ImageBox({
  image,
  alt = 'Cover image',
  cover = false,
  classesWrapper,
  ...props
}: ImageBoxProps) {
  const imageUrl = image ? urlForImage(image)?.url() : undefined;

  if (cover) {
    return (
      <div
        className={cn('relative h-full w-full', classesWrapper)}
        data-sanity={props['data-sanity']}
      >
        {imageUrl && (
          <Image
            alt={alt}
            src={imageUrl}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
          />
        )}
      </div>
    );
  }

  const aspectRatio = getImageAspectRatio(image);
  if (!aspectRatio) {
    return (
      <ImageBoxFallback
        imageUrl={imageUrl}
        alt={alt}
        cover={cover}
        classesWrapper={classesWrapper}
        data-sanity={props['data-sanity']}
      />
    );
  }

  return (
    <div
      className={cn('relative', classesWrapper)}
      style={{ aspectRatio: String(aspectRatio) }}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          alt={alt}
          src={imageUrl}
          className="object-contain"
          fill
          sizes="(max-width: 640px) 100vw, 640px"
        />
      )}
    </div>
  );
}
