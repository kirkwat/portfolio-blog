import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      title: 'Resume/CV',
      name: 'resume',
      description: 'Upload your most recent resume here.',
      type: 'file',
    }),
    defineField({
      name: 'header',
      title: 'Header/Navbar',
      type: 'object',
      fields: [
        defineField({
          name: 'menuItems',
          title: 'Menu Item list',
          description: 'Links displayed on the header of your site.',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Reference',
              type: 'reference',
              to: [
                {
                  type: 'home',
                },
                {
                  type: 'about',
                },
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
          ],
        }),
        defineField({
          name: 'blackWhiteHeader',
          description:
            'Disabled will make the header black with white text. Enabled will make the header white with black text.',
          title: 'Black/White Header',
          type: 'boolean',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'footerText',
          description: 'This is text that will appear within the footer.',
          title: 'Footer Text',
          type: 'string',
        }),
        defineField({
          name: 'blackWhiteFooter',
          description:
            'Disabled will make the footer black with white text. Enabled will make the footer white with black text.',
          title: 'Black/White Footer',
          type: 'boolean',
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'pinterest',
          title: 'Pinterest URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'vsco',
          title: 'VSCO URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'youtube',
          title: 'Youtube URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
