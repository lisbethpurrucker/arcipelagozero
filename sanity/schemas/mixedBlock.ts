import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mixedBlock',
  title: 'Mixed Block (Image + Text)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading above the text',
    }),
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
          title: 'Image description',
          description: 'Describe what is shown in the image. This helps visually impaired visitors and improves search rankings. E.g. "A sunset over the Mediterranean sea"',
        },
      ],
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Right', value: 'right'},
          {title: 'Left', value: 'left'},
        ],
      },
      initialValue: 'right',
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
      media: 'image',
      text: 'text',
    },
    prepare({title, media, text}) {
      const plainText = text
        ?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ') || ''
      return {
        title: title || 'Image + Text Block',
        subtitle: plainText ? plainText.substring(0, 60) + (plainText.length > 60 ? '...' : '') : 'No text yet',
        media,
      }
    },
  },
})
