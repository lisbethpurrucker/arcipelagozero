import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Hero (large text)', value: 'hero'},
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading above the text',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
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
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule: any) => Rule.uri({allowRelative: true}),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
      variant: 'variant',
    },
    prepare({title, text, variant}) {
      const plainText = text
        ?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ') || ''
      const label = variant === 'hero' ? 'Hero Text' : 'Text Block'
      return {
        title: title || label,
        subtitle: plainText ? plainText.substring(0, 60) + (plainText.length > 60 ? '...' : '') : 'Empty text block',
      }
    },
  },
})
