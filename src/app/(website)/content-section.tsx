import Link from 'next/link';

import ImageBox from '@/components/image-box';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HomePageQueryResult } from '@/sanity.types';
import { resolveHref } from '@/sanity/lib/utils';

export interface ContentSectionProps {
  contentSection: NonNullable<HomePageQueryResult>['contentSection'];
}

export function ContentSection({ contentSection }: ContentSectionProps) {
  if (!contentSection) {
    return null;
  }
  const { showcaseContent, readMoreButton } = contentSection;

  return (
    <section className="border-foreground my-2 border-y">
      <div className="divide-foreground grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {showcaseContent?.map((content, key) => {
          const href = resolveHref(content._type, content.slug);
          if (!href) {
            return null;
          }
          return (
            <div key={key} className="flex flex-col justify-between p-4">
              <div
                className={cn(
                  'mb-3 flex flex-col gap-3',
                  key % 2 !== 0 && 'sm:flex-col-reverse',
                )}
              >
                <div>
                  <h3 className="line-clamp-3 text-2xl font-medium tracking-tight italic">
                    {content.title}
                  </h3>
                  <p className="line-clamp-3 font-serif text-sm opacity-80">
                    {content.excerpt}
                  </p>
                </div>
                <div className="bg-background aspect-video overflow-hidden rounded-sm sm:aspect-16/12">
                  <ImageBox
                    image={content.coverImage}
                    alt={`Cover image for ${content.title}`}
                    cover
                  />
                </div>
              </div>
              <Button
                variant="inverse"
                nativeButton={false}
                render={<Link href={href} />}
              >
                {readMoreButton}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
