import type { PathSegment } from 'sanity';

import { CustomPortableText } from '@/components/custom-portable-text';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface HeaderProps {
  id: string | null;
  type: string | null;
  path: PathSegment[];
  centered?: boolean;
  description?: null | React.ComponentProps<typeof CustomPortableText>['value'];
  title?: string | null;
  subtitle?: string | null;
}
export function Header(props: HeaderProps) {
  const {
    id,
    type,
    path,
    title,
    subtitle,
    description,
    centered = false,
  } = props;
  if (!description && !subtitle && !title) {
    return null;
  }
  return (
    <div className={cn('my-8', centered && 'text-center')}>
      {/* Title */}
      {title && (
        <h1 className="mb-2 text-4xl font-medium tracking-tight uppercase italic md:mb-4 lg:text-5xl">
          {title}
        </h1>
      )}
      {/* Description */}
      {Array.isArray(description) && (
        <h2 className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-8 md:text-2xl">
          <CustomPortableText
            id={id}
            type={type}
            path={path}
            value={description}
          />
        </h2>
      )}
      {/* Subtitle */}
      {subtitle && (
        <div className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-8 md:text-2xl">
          {subtitle}
        </div>
      )}
      <Separator className="bg-foreground mx-auto mt-8 w-1/2" />
    </div>
  );
}
