import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'embedBlock',
  title: 'Embed Block',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the video',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9 (Widescreen)', value: '16/9'},
          {title: '4:3 (Standard)', value: '4/3'},
          {title: '1:1 (Square)', value: '1/1'},
          {title: '9:16 (Vertical)', value: '9/16'},
        ],
      },
      initialValue: '16/9',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({url, caption}) {
      return {
        title: 'Embed Block',
        subtitle: caption || url || 'No URL',
        media: () => '📺',
      }
    },
  },
})
