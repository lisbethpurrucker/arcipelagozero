import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading above the button',
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'array',
      description: 'Optional description text',
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({allowRelative: true}),
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Filled', value: 'filled'},
          {title: 'Outline', value: 'outline'},
          {title: 'Text Link', value: 'link'},
        ],
      },
      initialValue: 'filled',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      buttonText: 'buttonText',
    },
    prepare({heading, buttonText}) {
      return {
        title: 'CTA Block',
        subtitle: heading || buttonText || 'No text',
      }
    },
  },
})
