import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'embedBlock',
  title: 'Embed Block (YouTube/Vimeo)',
  type: 'object',
  description: 'Embed a YouTube or Vimeo video. Just paste the video URL and it will appear on your page.',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Paste the YouTube or Vimeo video URL here. Examples: "https://www.youtube.com/watch?v=abc123" or "https://vimeo.com/123456"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional text shown below the video to describe or credit it.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Video Shape',
      type: 'string',
      description: 'Choose the shape that matches your video. Most videos are widescreen (16:9).',
      options: {
        list: [
          {title: '16:9 Widescreen (most common)', value: '16/9'},
          {title: '4:3 Standard (older videos)', value: '4/3'},
          {title: '1:1 Square (Instagram-style)', value: '1/1'},
          {title: '9:16 Vertical (phone videos, TikTok)', value: '9/16'},
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
      }
    },
  },
})
