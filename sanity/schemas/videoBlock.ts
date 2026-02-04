import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  description: 'Upload a video file directly to the site. For YouTube or Vimeo videos, use the "Embed Block" instead.',
  fields: [
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      description: 'Upload your video file here (MP4, MOV, etc.). Keep file sizes reasonable for faster loading.',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional text shown below the video to describe or credit it.',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'When enabled, the video will start playing automatically (muted) when visitors see it. Good for background videos or short clips.',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      description: 'When enabled, the video will repeat continuously. Often used together with autoplay for ambient/background videos.',
      initialValue: false,
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
      }
    },
  },
})
