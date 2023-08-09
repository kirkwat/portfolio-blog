import { UlistIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'postList',
  title: 'Blog List Page',
  type: 'document',
  icon: UlistIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'pageTitle',
      description: 'This field is the title of the blog list page.',
      title: 'Blog List Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'This field is the subtitle of the blog list page.',
      title: 'Blog List Subtitle',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
    },
    prepare({ title }) {
      return {
        subtitle: 'Blog List Page',
        title,
      }
    },
  },
})
