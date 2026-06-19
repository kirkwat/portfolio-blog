import Link from 'next/link';

import ImageBox from '@/components/image-box';
import { Button } from '@/components/ui/button';
import type { HomePageQueryResult } from '@/sanity.types';
import { resolveHref } from '@/sanity/lib/utils';

export interface ShowcaseSectionProps {
  showcaseSection: NonNullable<HomePageQueryResult>['showcaseSection'];
}

export function ShowcaseSection({ showcaseSection }: ShowcaseSectionProps) {
  if (!showcaseSection) {
    return null;
  }
  const { showcaseImage, title, subtitle, learnMoreButton, showcaseContent } =
    showcaseSection;

  const showcaseHref =
    showcaseContent && resolveHref(showcaseContent._type, showcaseContent.slug);

  return (
    <section className="relative overflow-hidden select-none">
      <div className="bg-background aspect-4/5 overflow-hidden rounded-sm md:aspect-video">
        <ImageBox
          image={showcaseImage}
          alt={`Cover image for ${showcaseContent?.title || title}`}
          cover
        />
        <div className="bg-foreground absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-sm opacity-50" />
      </div>
      <div className="text-background absolute top-0 right-0 bottom-0 left-0 flex flex-col items-start justify-end p-10 text-center sm:justify-start sm:text-start">
        <div className="h-1/2 sm:w-1/2 md:w-1/3">
          <h2 className="mb-5 text-3xl font-medium uppercase italic">
            {title}
          </h2>
          <p className="mb-5 font-serif text-sm">{subtitle}</p>
          {showcaseHref && (
            <Button
              variant="cta"
              nativeButton={false}
              render={<Link href={showcaseHref} />}
            >
              {learnMoreButton}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
