import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mixedBlock',
  title: 'Mixed Block (Image + Text)',
  type: 'object',
  description: 'A two-column layout with an image on one side and text on the other. Great for showcasing features or telling stories.',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading that appears above the text in bold, uppercase letters.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The image to display. Click the crop/hotspot button after uploading to choose which part of the image to focus on.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          description: 'Describe what is shown in the image. This helps visually impaired visitors and improves search rankings. E.g. "A sunset over the Mediterranean sea"',
        },
      ],
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'array',
      description: 'Your main content. Use the toolbar to make text bold, italic, or add links.',
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
                    description: 'The web address to link to. Can be a full URL (https://...) or a page on this site (/contact).',
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      description: 'Choose which side the image appears on. On mobile, the image always appears above the text.',
      options: {
        list: [
          {title: 'Image on Right', value: 'right'},
          {title: 'Image on Left', value: 'left'},
        ],
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Text Background Color',
      type: 'string',
      description: 'Choose a background color for the text area.',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Sand', value: 'sand'},
          {title: 'Mint', value: 'mint'},
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'callToAction',
      title: 'Link Button',
      type: 'object',
      description: 'Optional button or link that appears below the text.',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'What the link says, e.g. "Learn more" or "View details".',
        },
        {
          name: 'url',
          title: 'Link URL',
          type: 'url',
          description: 'Where the link goes. Can be a full URL or a page on this site (e.g. /contact).',
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
