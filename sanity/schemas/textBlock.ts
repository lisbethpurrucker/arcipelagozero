import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
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
      text: 'text',
      bg: 'backgroundColor',
    },
    prepare({text, bg}) {
      return {
        title: 'Text Block',
        subtitle: text?.substring(0, 50) + (text?.length > 50 ? '...' : ''),
        media: () => `📝`,
      }
    },
  },
})
