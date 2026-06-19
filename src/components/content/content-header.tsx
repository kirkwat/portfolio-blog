import { format, parseISO } from 'date-fns';

import { Separator } from '@/components/ui/separator';
import type {
  PostBySlugQueryResult,
  ProjectBySlugQueryResult,
} from '@/sanity.types';

type ContentHeaderProps = Pick<
  NonNullable<PostBySlugQueryResult> | NonNullable<ProjectBySlugQueryResult>,
  'title' | 'date' | 'tags'
>;

export default function ContentHeader(props: ContentHeaderProps) {
  const { title, date, tags } = props;
  return (
    <div className="mb-5">
      <h1 className="mt-8 mb-4 text-center text-4xl font-medium tracking-tighter italic md:text-5xl">
        {title}
      </h1>
      {date && (
        <div className="mb-3 text-center text-lg italic opacity-80">
          <time dateTime={date}>{format(parseISO(date), 'LLLL\td, yyyy')}</time>
        </div>
      )}
      <div className="mb-3 flex flex-row flex-wrap place-content-center">
        {tags?.map((tag, key) => (
          <div
            key={key}
            className="mr-1 text-lg wrap-break-word lowercase opacity-80"
          >
            #{tag}
          </div>
        ))}
      </div>
      <Separator className="bg-foreground mx-auto mt-5 w-1/2" />
    </div>
  );
}
