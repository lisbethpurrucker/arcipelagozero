import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'embedBlock',
  title: 'Embed Block',
  type: 'object',
  description: 'Embed external content like videos (YouTube, Vimeo) or forms (Google Forms, Formly, Typeform).',
  fields: [
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      description: 'What type of content are you embedding?',
      options: {
        list: [
          {title: 'Video (YouTube, Vimeo)', value: 'video'},
          {title: 'Form (Google Forms, Formly, Typeform)', value: 'form'},
          {title: 'Other (any iframe URL)', value: 'other'},
        ],
      },
      initialValue: 'video',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Paste the URL here. For videos: the YouTube/Vimeo page URL. For forms: the embed/share URL from the form service.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional text shown below the embed.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Video Shape',
      type: 'string',
      description: 'Choose the shape that matches your video.',
      options: {
        list: [
          {title: '16:9 Widescreen (most common)', value: '16/9'},
          {title: '4:3 Standard (older videos)', value: '4/3'},
          {title: '1:1 Square (Instagram-style)', value: '1/1'},
          {title: '9:16 Vertical (phone videos, TikTok)', value: '9/16'},
        ],
      },
      initialValue: '16/9',
      hidden: ({parent}) => parent?.embedType !== 'video',
    }),
    defineField({
      name: 'height',
      title: 'Form Height',
      type: 'string',
      description: 'How tall should the form be?',
      options: {
        list: [
          {title: 'Small (400px)', value: 'small'},
          {title: 'Medium (600px)', value: 'medium'},
          {title: 'Large (800px)', value: 'large'},
          {title: 'Extra Large (1000px)', value: 'xlarge'},
        ],
      },
      initialValue: 'medium',
      hidden: ({parent}) => parent?.embedType === 'video',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
      embedType: 'embedType',
    },
    prepare({url, caption, embedType}) {
      const typeLabels: Record<string, string> = {
        video: 'Video',
        form: 'Form',
        other: 'Embed',
      }
      return {
        title: typeLabels[embedType] || 'Embed Block',
        subtitle: caption || url || 'No URL',
      }
    },
  },
})
