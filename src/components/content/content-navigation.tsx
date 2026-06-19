import Link from 'next/link';

import ImageBox from '@/components/image-box';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { resolveHref } from '@/sanity/lib/utils';

import type { ShowcaseContent } from './types';

interface ContentNavigationProps {
  content: ShowcaseContent[];
  slug: string;
}

const contentTypeMap = {
  post: 'Post',
  project: 'Project',
};

export default function ContentNavigation({
  content,
  slug,
}: ContentNavigationProps) {
  const currentContentIndex = content.findIndex(
    (content: ShowcaseContent) => content.slug === slug,
  );

  const nextContent = content[currentContentIndex + 1];
  const nextContentHref = nextContent
    ? resolveHref(nextContent._type, nextContent.slug)
    : '';

  const prevContent = content[currentContentIndex - 1];
  const prevContentHref = prevContent
    ? resolveHref(prevContent._type, prevContent.slug)
    : '';

  return (
    <div className="mt-12 mb-6 grid w-full gap-4 sm:grid-cols-2 sm:gap-6">
      {prevContentHref && (
        <Link
          href={prevContentHref}
          className={cn(
            'group block cursor-pointer',
            nextContentHref ? 'sm:col-start-1' : 'sm:col-span-2',
          )}
        >
          <Card
            className={cn(
              'hover:border-primary h-full gap-0 rounded-sm border py-0 text-base ring-0',
              !nextContentHref && 'sm:flex-row-reverse',
            )}
          >
            <div
              className={cn(
                'bg-background group-hover:border-primary aspect-video overflow-hidden',
                nextContentHref ? 'border-b' : 'border-l',
              )}
            >
              <ImageBox
                image={prevContent.coverImage}
                alt={`Cover image from ${prevContent.title}`}
                cover
                classesWrapper="transition-all duration-200 group-hover:scale-105"
              />
            </div>
            <CardContent className="grow p-4">
              <p className="mb-1 opacity-80">
                <span>&larr; </span>
                <span className="decoration-primary font-serif text-sm group-hover:underline">
                  Previous {contentTypeMap[prevContent._type]}
                </span>
              </p>
              <p className="decoration-primary line-clamp-1 text-lg font-medium text-ellipsis group-hover:underline">
                {prevContent.title}
              </p>
            </CardContent>
          </Card>
        </Link>
      )}
      {nextContentHref && (
        <Link
          href={nextContentHref}
          className={cn(
            'group block cursor-pointer',
            prevContentHref ? 'sm:col-start-2' : 'sm:col-span-2',
          )}
        >
          <Card
            className={cn(
              'hover:border-primary h-full gap-0 rounded-md border py-0 text-base ring-0',
              !prevContentHref && 'sm:flex-row',
            )}
          >
            <div
              className={cn(
                'bg-background group-hover:border-primary aspect-video overflow-hidden',
                prevContentHref ? 'border-b' : 'border-r',
              )}
            >
              <ImageBox
                image={nextContent.coverImage}
                alt={`Cover image from ${nextContent.title}`}
                cover
                classesWrapper="transition-all duration-200 group-hover:scale-105"
              />
            </div>
            <CardContent className="flex grow flex-col p-4">
              <p className="mb-1 ml-auto opacity-80">
                <span className="decoration-primary font-serif text-sm group-hover:underline">
                  Next {contentTypeMap[nextContent._type]}
                </span>
                <span> &rarr;</span>
              </p>
              <p className="decoration-primary ml-auto line-clamp-1 text-lg font-medium group-hover:underline">
                {nextContent.title}
              </p>
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
}
