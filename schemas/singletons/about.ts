import { ImageIcon, InfoOutlineIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  icon: InfoOutlineIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      description: 'This is the title of the About Me page.',
      title: 'About Me Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'This is the subtitle of the About Me page.',
      title: 'About Me Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Full size',
              name: 'fullSize',
              type: 'boolean',
              description: 'If false, the image will be half width',
            }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'string',
              description: 'Optional: Caption becomes a hyperlink to this URL',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Optional: Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineArrayMember({
          name: 'multipleImages',
          type: 'multipleImages',
          title: 'Multiple Images',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'Copy an excerpt from above or write a small overview of the about section. Used for the <meta> description tag for SEO.',
    }),
    defineField({
      name: 'title',
      description: 'This is the page name for the site header/navbar.',
      title: 'About Me Header/Navbar Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      pageTitle: 'pageTitle',
    },
    prepare({ pageTitle }) {
      return {
        title: 'About Me Page',
        subtitle: pageTitle,
      }
    },
  },
})
