import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL', validation: (Rule: any) => Rule.uri({allowRelative: true})},
                ],
              },
            ],
          },
        },
      ],
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
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
    },
    prepare({quote, author}) {
      const plainQuote = quote
        ?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ') || ''
      const preview = plainQuote ? `"${plainQuote.substring(0, 40)}${plainQuote.length > 40 ? '...' : ''}"` : 'Empty quote'
      return {
        title: 'Quote Block',
        subtitle: `${preview} ${author ? `— ${author}` : ''}`.trim(),
      }
    },
  },
})
