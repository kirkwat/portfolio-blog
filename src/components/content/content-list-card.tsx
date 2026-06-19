import { format, parseISO } from 'date-fns';

import ImageBox from '@/components/image-box';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { ShowcaseContent } from './types';

interface ContentListCardProps {
  content: ShowcaseContent;
  secondaryBackground?: boolean;
}

export function ContentListCard(props: ContentListCardProps) {
  const { content, secondaryBackground } = props;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg p-2 sm:flex sm:aspect-32/9 sm:flex-row',
        secondaryBackground
          ? 'hover:bg-muted focus:bg-muted'
          : 'hover:bg-muted/50 focus:bg-muted/50',
      )}
    >
      <div className="bg-background aspect-video overflow-hidden rounded-lg border select-none sm:w-1/2">
        <ImageBox
          image={content.coverImage}
          alt={`Cover image for ${content.title}`}
          cover
          classesWrapper="transition-all duration-200 group-hover:scale-105 group-focus:scale-105"
        />
      </div>
      <div className="px-2 sm:w-1/2 sm:pr-0 sm:pl-3">
        <h3 className="text-xl font-medium tracking-tight italic sm:mb-1 md:text-3xl">
          {content.title}
        </h3>
        {content.date && (
          <div className="italic opacity-80 md:text-lg">
            <time dateTime={content.date}>
              {format(parseISO(content.date), 'LLLL\td, yyyy')}
            </time>
          </div>
        )}
        <p className="font-serif opacity-80 sm:line-clamp-2 lg:line-clamp-6 lg:text-lg">
          {content.excerpt}
        </p>
      </div>
      <div className="absolute top-0 mx-4 mt-4 flex flex-row flex-wrap gap-2">
        {content.tags?.map((tag, key) => (
          <Badge variant="tag" key={key}>
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
