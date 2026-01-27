import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color (if no image)',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Teal', value: 'teal'},
          {title: 'Sand', value: 'sand'},
        ],
      },
      initialValue: 'sand',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
    },
    prepare({media, alt}) {
      return {
        title: 'Image Block',
        subtitle: alt || 'No alt text',
        media,
      }
    },
  },
})
