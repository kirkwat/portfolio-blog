import { ImageIcon, PresentationIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: PresentationIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Content',
      description: 'This is where you describe what you did for the project.',
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
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'Copy an excerpt from above or write a small overview of the project. Used both for the <meta> description tag for SEO and project list cards.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'This date shows when the project was posted.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'The client that the project was for.',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'url',
      description: 'A relevant site for the project.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      description: 'The time period that you worked on the project.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, date }) {
      const subtitles = [
        date && `Published on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
