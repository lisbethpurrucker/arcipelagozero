import {defineField, defineType} from 'sanity'
import {AlignmentInput, FontSizeInput} from '../components'

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
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading that appears above the text in bold, uppercase letters.',
    }),
    defineField({
      name: 'fontSize',
      title: 'Size',
      type: 'string',
      components: {
        input: FontSizeInput,
      },
      initialValue: 'normal',
      hidden: ({parent}) => parent?.variant === 'hero',
    }),
    defineField({
      name: 'textAlign',
      title: 'Alignment',
      type: 'string',
      components: {
        input: AlignmentInput,
      },
      initialValue: 'left',
      hidden: ({parent}) => parent?.variant === 'hero',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
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
