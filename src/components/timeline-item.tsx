import ImageBox from '@/components/image-box';
import type { Milestone } from '@/sanity.types';

export function TimelineItem({ milestone }: { milestone: Milestone }) {
  const { description, duration, image, tags, title } = milestone;
  const startYear = duration?.start
    ? new Date(duration.start).getFullYear()
    : undefined;
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : 'Now';

  return (
    <div className="flex min-h-[200px] pb-2 group-last:pb-0">
      <div className="flex flex-col">
        {/* Thumbnail */}
        <div
          className="bg-foreground relative overflow-hidden rounded-md"
          style={{ width: '65px', height: '65px' }}
        >
          <ImageBox image={image} alt={title || 'Timeline item icon'} />
        </div>
        {/* Vertical line */}
        <div className="bg-muted mt-2 w-px grow self-center group-last:hidden" />
      </div>
      <div className="flex-initial pl-4">
        {/* Title */}
        <div className="text-foreground font-bold">{title}</div>
        {/* Tags */}
        <div className="text-muted-foreground text-sm">
          {tags?.map((tag, key) => (
            <span key={key}>
              {tag}
              <span className="mx-1">●</span>
            </span>
          ))}
          {startYear} - {endYear}
        </div>
        {/* Description */}
        <div className="text-muted-foreground pt-3 pb-5 font-serif">
          {description}
        </div>
      </div>
    </div>
  );
}
