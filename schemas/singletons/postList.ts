import { UlistIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'postList',
  title: 'Post List Page',
  type: 'document',
  icon: UlistIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'pageTitle',
      description: 'This is the title of the blog list page.',
      title: 'Blog List Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'This is the subtitle of the blog list page.',
      title: 'Blog List Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      description: 'This is the page name for the site header/navbar.',
      title: 'Blog List Header/Navbar Title',
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
        title: 'Post List Page',
        subtitle: pageTitle,
      }
    },
  },
})
