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
      description: 'This is the title of your personal website.',
      title: 'Name/Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'landingSection',
      description: 'This is the first section of your home page.',
      title: 'Landing Section',
      type: 'object',
      fields: [
        defineField({
          name: 'subtitle',
          description: 'This is the subtitle of your personal website.',
          title: 'Subtitle/Description',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'aboutMeButton',
          description:
            'This is the text for the button that redirects to the About Me page.',
          title: 'About Me Button',
          type: 'string',
          initialValue: 'About Me',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'landingImage',
          description: 'This image welcomes users to your personal website.',
          title: 'Landing Section Image',
          type: 'image',
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'contentSection',
      description: 'In this section, you can show off 3 posts/projects.',
      title: 'Content Section',
      type: 'object',
      fields: [
        defineField({
          name: 'showcaseContent',
          title: 'Showcase Content',
          type: 'array',
          validation: (rule) => rule.required().length(3),
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'post' }, { type: 'project' }],
            }),
          ],
        }),
        defineField({
          name: 'readMoreButton',
          description:
            'This is the text for the button that redirects to the content.',
          title: 'Read More Button',
          type: 'string',
          initialValue: 'Read More',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'showcaseSection',
      description:
        'In this section, you can redirect users to your post or project pages or also a specific post/project.',
      title: 'Showcase Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          description: 'This is the title of your showcase section.',
          title: 'Showcase Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          description: 'This is the description of your showcase section.',
          title: 'Subtitle/Description',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'showcaseContent',
          title: 'Showcase Content',
          description:
            'This is the content that will be showcased and what the Learn More Button will redirect to. It can be a specific post/project, or it can be the entire post/project list page.',
          type: 'reference',
          to: [
            {
              type: 'postList',
            },
            {
              type: 'projectList',
            },
            {
              type: 'page',
            },
            {
              type: 'post',
            },
            {
              type: 'project',
            },
          ],
        }),
        defineField({
          name: 'learnMoreButton',
          description:
            'This is the text for the button that redirects to what you are showcasing.',
          title: 'Learn More Button',
          type: 'string',
          initialValue: 'Learn More',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'showcaseImage',
          description: 'This image is be used for the showcase section.',
          title: 'Showcase Section Image',
          type: 'image',
          options: { hotspot: true },
          validation: (rule) => rule.required(),
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
        title: title || 'Home',
      }
    },
  },
})
