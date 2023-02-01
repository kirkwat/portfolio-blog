import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    avatar,
    overview,
    showcasePosts[]->{
      _type,
      coverImage, 
      excerpt, 
      "slug": slug.current,
      date,
      tags,
      title, 
    }, 
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    role,
    school,
    school_link,
    interests,
    degrees,
    postTitle,
    postSubtitle,
    projectTitle,
    projectSubtitle,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const postListPageQuery = groq`
  *[_type == "postList"][0]{
    pageTitle,
    subtitle,
  }
`

export const projectListPageQuery = groq`
  *[_type == "projectList"][0]{
    pageTitle,
    subtitle,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`
export const postsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _type,
    excerpt,
    coverImage,
    date,
    "slug": slug.current,
    tags,
    title,
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    content,
    excerpt,
    coverImage,
    date,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _type,
    coverImage,
    overview,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const postPaths = groq`
  *[_type == "post" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

//TODO add support for resume file
export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
    linkedin,
    instagram,
    facebook,
    pinterest,
    youtube,
    tiktok,
    twitter
  }
`
