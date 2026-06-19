import type { PostsQueryResult, ProjectsQueryResult } from '@/sanity.types';

/**
 * A single content item as returned by `postsQuery` / `projectsQuery`
 * (the App Router equivalent of the old hand-written `ShowcaseContent` type).
 */
export type ShowcaseContent =
  | PostsQueryResult[number]
  | ProjectsQueryResult[number];
