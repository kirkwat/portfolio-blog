import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    title,
    landingSection{
      subtitle,
      aboutMeButton,
      landingImage
    },
    contentSection{
      showcaseContent[]->{
        _type,
        excerpt,
        coverImage,
        date,
        "slug": slug.current,
        tags,
        title,
      },
      readMoreButton
    },
    showcaseSection{
      title,
      subtitle,
      showcaseContent->{
        _type,
        "slug": slug.current,
        title,
      },
      learnMoreButton,
      showcaseImage
    }
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const aboutPageQuery = groq`
  *[_type == "about"][0]{
    pageTitle,
    subtitle,
    content,
    excerpt,
  }
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
  *[_type == "post"] | order(date desc) {
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
  *[_type == "project"] | order(date desc) {
    _type,
    coverImage,
    excerpt,
    date,
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
    exc,
    site,
    "slug": slug.current,
    tags,
    title,
    date,
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
    "resume": resume.asset->url,
    header{
      menuItems[]->{
        _type,
        "slug": slug.current,
        title
      },
      blackWhiteHeader
    },
    footer{
      footerText,
      blackWhiteFooter
    },
    socials{
      linkedin,
      instagram,
      facebook,
      pinterest,
      vsco,
      youtube,
      tiktok,
      twitter,
    },
    ogImage,
  }
`
