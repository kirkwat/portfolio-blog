import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Name and Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      description: 'This field is your current role (student, designer, etc).',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'school',
      description: 'This field is your current school or company.',
      title: 'School/Company',
      type: 'string',
    }),
    defineField({
      name: 'school_link',
      description: 'This field is a link for your current school or company.',
      title: 'School/Company Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'avatar',
      description: 'This is your avatar for your personal website.',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      title: 'Interests',
      name: 'interests',
      description: 'List any career interests you may have.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'degrees',
      title: 'Degrees',
      description:
        'These are your degrees that you have completed or are working towards.',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Degree',
          name: 'degree',
          type: 'degree',
        }),
      ],
    }),
    defineField({
      name: 'postTitle',
      description: 'This field is the title of the Featured Posts section.',
      title: 'Post Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postSubtitle',
      description: 'This field is the subtitle of the Featured Posts section.',
      title: 'Post Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'showcasePosts',
      title: 'Showcase posts',
      description:
        'These are the posts that will appear first on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
    }),
    defineField({
      name: 'projectTitle',
      description: 'This field is the title of the Featured Projects section.',
      title: 'Project Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectSubtitle',
      description:
        'This field is the subtitle of the Featured Projects section.',
      title: 'Project Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'showcaseProjects',
      title: 'Showcase projects',
      description:
        'These are the projects that will appear first on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
