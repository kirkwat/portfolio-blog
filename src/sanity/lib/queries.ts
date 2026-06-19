import { defineQuery } from 'next-sanity';

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
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
`);

export const homePageTitleQuery = defineQuery(`
  *[_type == "home"][0].title
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "about"][0]{
    _id,
    _type,
    pageTitle,
    subtitle,
    content,
    excerpt,
  }
`);

export const postListPageQuery = defineQuery(`
  *[_type == "postList"][0]{
    pageTitle,
    subtitle,
  }
`);

export const projectListPageQuery = defineQuery(`
  *[_type == "projectList"][0]{
    pageTitle,
    subtitle,
  }
`);

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    _type,
    excerpt,
    coverImage,
    date,
    "slug": slug.current,
    tags,
    title,
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    content,
    excerpt,
    coverImage,
    date,
    "slug": slug.current,
    tags,
    title,
  }
`);

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(date desc) {
    _type,
    coverImage,
    excerpt,
    date,
    "slug": slug.current,
    tags,
    title,
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    client,
    coverImage,
    description,
    duration,
    excerpt,
    site,
    "slug": slug.current,
    tags,
    title,
    date,
  }
`);

export const projectPaths = defineQuery(`
  *[_type == "project" && slug.current != null]{
    "slug": slug.current,
    "lastModified": _updatedAt,
  }
`);

export const postPaths = defineQuery(`
  *[_type == "post" && slug.current != null]{
    "slug": slug.current,
    "lastModified": _updatedAt,
  }
`);

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    "menuItems": header.menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    ogImage,
  }
`);

export const siteSettingsQuery = defineQuery(`
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
`);
