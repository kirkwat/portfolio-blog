import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'degree',
  title: 'Degree',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'major',
      title: 'Major',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'college',
      title: 'College',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'number',
      name: 'year',
      title: 'Year',
      description: 'Year you will graduate.',
      validation: (rule) => rule.required().min(1980).max(2050),
    }),
  ],
  preview: {
    select: {
      major: 'major',
      college: 'college',
    },
    prepare({ major, college }) {
      return { major, subtitle: college }
    },
  },
})
