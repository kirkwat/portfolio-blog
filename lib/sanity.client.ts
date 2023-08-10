import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  aboutPageQuery,
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  postBySlugQuery,
  postListPageQuery,
  postPaths,
  postsQuery,
  projectBySlugQuery,
  projectListPageQuery,
  projectPaths,
  projectsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type {
  AboutPagePayload,
  HomePagePayload,
  PagePayload,
  PostListPagePayload,
  PostPayload,
  ProjectListPagePayload,
  ProjectPayload,
  SettingsPayload,
  ShowcaseContent,
} from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}

export async function getAboutPage({
  token,
}: {
  token?: string
}): Promise<AboutPagePayload | undefined> {
  return await sanityClient(token)?.fetch(aboutPageQuery)
}

export async function getPostListPage({
  token,
}: {
  token?: string
}): Promise<PostListPagePayload | undefined> {
  return await sanityClient(token)?.fetch(postListPageQuery)
}

export async function getProjectListPage({
  token,
}: {
  token?: string
}): Promise<ProjectListPagePayload | undefined> {
  return await sanityClient(token)?.fetch(projectListPageQuery)
}

export async function getHomePageTitle({
  token,
}: {
  token?: string
}): Promise<string | undefined> {
  return await sanityClient(token)?.fetch(homePageTitleQuery)
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, { slug })
}

export async function getPostBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PostPayload | undefined> {
  return await sanityClient(token)?.fetch(postBySlugQuery, { slug })
}

export async function getProjectBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<ProjectPayload | undefined> {
  return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
}

export async function getPosts({
  token,
}: {
  token?: string
}): Promise<ShowcaseContent[] | undefined> {
  return await sanityClient(token)?.fetch(postsQuery)
}

export async function getProjects({
  token,
}: {
  token?: string
}): Promise<ShowcaseContent[] | undefined> {
  return await sanityClient(token)?.fetch(projectsQuery)
}

export async function getSettings({
  token,
}: {
  token?: string
}): Promise<SettingsPayload | undefined> {
  return await sanityClient(token)?.fetch(settingsQuery)
}

export async function getProjectPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(projectPaths)
}

export async function getPostPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(postPaths)
}

export async function getPagePaths(): Promise<string[]> {
  return await sanityClient()?.fetch(pagePaths)
}
