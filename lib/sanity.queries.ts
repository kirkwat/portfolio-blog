import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    showcasePosts[]->{
      _type,
      coverImage, 
      overview, 
      "slug": slug.current,
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
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
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
    _id,
    content,
    overview,
    coverImage,
    date,
    "slug": slug.current,
    title,
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    content,
    overview,
    coverImage,
    date,
    slug,
    title,
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _type,
    _id,
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

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
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

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
