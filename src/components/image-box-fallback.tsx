'use client';

import { useState, type SyntheticEvent } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ImageBoxFallbackProps {
  imageUrl?: string;
  alt: string;
  cover: boolean;
  classesWrapper?: string;
  'data-sanity'?: string;
}

/**
 * Legacy client-side behavior for images whose asset `_ref` can't be parsed:
 * measure the intrinsic dimensions on load and size the wrapper with the
 * width-relative padding-bottom hack.
 */
export function ImageBoxFallback({
  imageUrl,
  alt,
  cover,
  classesWrapper,
  ...props
}: ImageBoxFallbackProps) {
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setAspectRatio(
      event.currentTarget.naturalWidth / event.currentTarget.naturalHeight,
    );
  };

  return (
    <div
      className={cn('relative', classesWrapper)}
      style={{ paddingBottom: `${100 / aspectRatio}%` }}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          alt={alt}
          src={imageUrl}
          className={cn(
            'absolute top-0 right-0 bottom-0 left-0 h-full w-full',
            cover ? 'object-cover' : 'object-contain',
          )}
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
}
