import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the video',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Video will autoplay muted when visible',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      description: 'Video will loop continuously',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Teal', value: 'teal'},
          {title: 'Sand', value: 'sand'},
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
    },
    prepare({caption}) {
      return {
        title: 'Video Block',
        subtitle: caption || 'No caption',
        media: () => '🎬',
      }
    },
  },
})
