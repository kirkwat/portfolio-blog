import type { Image, PortableTextBlock } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface DegreeItem {
  major?: string
  college?: string
  year?: number
}

export interface ShowcaseContent {
  _type: string
  coverImage?: Image
  excerpt?: string
  slug?: string
  tags?: string[]
  date?: string
  title?: string
}

// Page payloads

export interface HomePagePayload {
  avatar?: Image
  overview?: PortableTextBlock[]
  showcasePosts?: ShowcaseContent[]
  showcaseProjects?: ShowcaseContent[]
  title?: string
  role?: string
  school?: string
  school_link?: string
  interests?: string[]
  degrees?: DegreeItem[]
  postTitle?: string
  postSubtitle?: string
  projectTitle?: string
  projectSubtitle?: string
}

export interface PostListPagePayload {
  pageTitle?: string
  subtitle?: string
}

export interface ProjectListPagePayload {
  pageTitle?: string
  subtitle?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface PostPayload {
  title?: string
  slug?: string
  tags?: string[]
  content?: PortableTextBlock[]
  excerpt?: string
  coverImage?: Image
  date?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  excerpt?: string
  site?: string
  slug?: string
  tags?: string[]
  title?: string
  date?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  linkedin?: string
  instagram?: string
  facebook?: string
  pinterest?: string
  vsco?: string
  youtube?: string
  tiktok?: string
  twitter?: string
  resume?: string
}
