import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType, Image } from 'sanity'

export default defineType({
  type: 'object',
  name: 'multipleImages',
  title: 'multipleImages',
  icon: ImagesIcon,
  fields: [
    {
      type: 'string',
      name: 'imageHeight',
      title: 'Image Height',
      options: {
        list: [
          { title: 'Short', value: 'short' },
          { title: 'Normal', value: 'normal' },
          { title: 'Tall', value: 'tall' },
        ],
      },
      initialValue: 'normal',
      validation: (rule) => rule.required(),
    },
    {
      type: 'array',
      name: 'images',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
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
        },
      ],
      validation: (rule) => rule.min(2).max(3).required(),
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({
      images,
    }: {
      images: (Image & {
        alt?: string
        caption?: string
        link?: string
      })[]
    }) {
      const numImages = images ? images.length : 0
      const captions = images
        ? images.map((image) => image.caption).filter(Boolean)
        : []
      const caption = captions.length > 0 ? captions.join(', ') : 'No captions'

      return {
        title: `Multiple Images (${numImages})`,
        subtitle: caption,
      }
    },
  },
})
