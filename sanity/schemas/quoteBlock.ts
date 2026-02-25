import {defineField, defineType} from 'sanity'
import {FontSizeInput} from '../components'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  description: 'A styled quote or testimonial. Use this to highlight what someone said about your work or an inspiring statement.',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'array',
      description: 'The actual quote. You can make parts bold or italic using the toolbar.',
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
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'Link to the source of this quote, if applicable.',
                    validation: (Rule: any) => Rule.uri({allowRelative: true}),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'fontSize',
      title: 'Text Size',
      type: 'string',
      components: {
        input: FontSizeInput,
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Who said this quote? E.g. "Maria Rossi" or "The Guardian"',
    }),
    defineField({
      name: 'role',
      title: 'Author Title/Role',
      type: 'string',
      description: 'The author\'s title or role, shown after their name. E.g. "CEO at Company" or "Travel Writer"',
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
