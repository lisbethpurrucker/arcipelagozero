import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name of the person being quoted',
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'Optional role or title of the author',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
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
      quote: 'quote',
      author: 'author',
    },
    prepare({quote, author}) {
      return {
        title: 'Quote Block',
        subtitle: `"${quote?.substring(0, 40)}${quote?.length > 40 ? '...' : ''}" ${author ? `— ${author}` : ''}`,
        media: () => '💬',
      }
    },
  },
})
