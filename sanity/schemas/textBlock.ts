import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  description: 'A simple text section. Use this for paragraphs, headings, or any written content.',
  fields: [
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      description: 'Choose how this text should appear. "Hero" is great for big opening statements at the top of a page.',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Hero (large, bold text)', value: 'hero'},
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'fontSize',
      title: 'Text Size',
      type: 'string',
      description: 'Choose the size of the text. "Body" is the standard reading size for most content.',
      options: {
        list: [
          {title: 'Caption (12px)', value: 'caption'},
          {title: 'Body (16px)', value: 'body'},
          {title: 'Lead (18px)', value: 'lead'},
          {title: 'Subheading (20px)', value: 'subheading'},
          {title: 'Heading (24px)', value: 'heading'},
        ],
      },
      initialValue: 'body',
      hidden: ({parent}) => parent?.variant === 'hero',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      description: 'Choose how the text is aligned within the block.',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading that appears above the text in bold, uppercase letters.',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'array',
      description: 'Your main content. Use the toolbar to make text bold, italic, or add links. Press Enter twice to create a gap between paragraphs.',
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
      name: 'callToAction',
      title: 'Link Button',
      type: 'object',
      description: 'Optional button or link that appears below the text.',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'What the link says, e.g. "Learn more" or "Contact us".',
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
