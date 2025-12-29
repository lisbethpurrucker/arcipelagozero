import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mixedBlock',
  title: 'Mixed Block (Image + Text)',
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
        },
      ],
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Teal', value: 'teal'},
          {title: 'Cream', value: 'cream'},
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      text: 'text',
    },
    prepare({media, text}) {
      return {
        title: 'Mixed Block',
        subtitle: text?.substring(0, 50) + (text?.length > 50 ? '...' : ''),
        media,
      }
    },
  },
})
