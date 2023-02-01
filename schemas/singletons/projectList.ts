import { UlistIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectList',
  title: 'Project List Page',
  type: 'document',
  icon: UlistIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'pageTitle',
      description: 'This field is the title of the project list page.',
      title: 'Project List Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'This field is the subtitle of the project list page.',
      title: 'Project List Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      description: 'This field is the page name for the site header.',
      title: 'Project List Header Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Project List Page',
        title,
      }
    },
  },
})
