import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call-to-Action Block',
  type: 'object',
  description: 'A prominent button or link to encourage visitors to take action (e.g. "Book Now", "Contact Us", "Learn More").',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading above the button, e.g. "Ready to get started?" Leave empty for just a button.',
    }),
    defineField({
      name: 'text',
      title: 'Supporting Text',
      type: 'array',
      description: 'Optional text between the heading and button. Keep it brief and compelling.',
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'What the button says. Keep it short and action-oriented: "Book Now", "Get Started", "Contact Us".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button Link',
      type: 'url',
      description: 'Where visitors go when they click. Can be a page on this site (/contact) or an external URL (https://...).',
      validation: (Rule) => Rule.required().uri({allowRelative: true}),
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      description: 'How the button looks. "Filled" is most prominent, "Text Link" is most subtle.',
      options: {
        list: [
          {title: 'Filled (solid background)', value: 'filled'},
          {title: 'Outline (bordered)', value: 'outline'},
          {title: 'Text Link (underlined text)', value: 'link'},
        ],
      },
      initialValue: 'filled',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      description: 'Where the content appears horizontally on the page.',
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
        title: 'Call-to-Action Block',
        subtitle: heading || buttonText || 'No text',
      }
    },
  },
})
