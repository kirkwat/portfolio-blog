import Link from 'next/link';

import { Header } from '@/components/header';
import type {
  PostListPageQueryResult,
  ProjectListPageQueryResult,
} from '@/sanity.types';
import { resolveHref } from '@/sanity/lib/utils';

import { ContentListCard } from './content-list-card';
import type { ShowcaseContent } from './types';

export interface ContentListPageProps {
  contentList: ShowcaseContent[];
  contentListHeader: PostListPageQueryResult | ProjectListPageQueryResult;
}

export function ContentListPage({
  contentList,
  contentListHeader,
}: ContentListPageProps) {
  const pageTitle = contentListHeader?.pageTitle ?? 'Content';
  const subtitle = contentListHeader?.subtitle ?? 'Check out my content!';

  return (
    <div className="mx-auto max-w-5xl">
      <Header
        id={null}
        type={null}
        path={[]}
        centered
        title={pageTitle}
        subtitle={subtitle}
      />
      {contentList && contentList.length > 0 && (
        <div className="grid justify-center gap-4">
          {contentList.map((content, key) => {
            const href = resolveHref(content._type, content.slug);
            if (!href) {
              return null;
            }
            return (
              <Link key={key} href={href}>
                <ContentListCard content={content} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
