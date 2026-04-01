import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  description: 'A single image displayed at full width. Use this for standalone photos or illustrations.',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload your image here. After uploading, click the crop/hotspot button to choose which part of the image to focus on.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          description: 'Describe what is shown in the image. This helps visually impaired visitors and improves search rankings. E.g. "A group of people enjoying dinner on the terrace"',
        },
      ],
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Image Ratio',
      type: 'string',
      description: 'Choose the shape of the image. Default is a standard landscape rectangle.',
      options: {
        list: [
          {title: '16:9 — Wide landscape', value: '16/9'},
          {title: '3:2 — Landscape (default)', value: '3/2'},
          {title: '4:3 — Standard', value: '4/3'},
          {title: '1:1 — Square', value: '1/1'},
          {title: '3:4 — Portrait', value: '3/4'},
          {title: '2:3 — Vertical portrait', value: '2/3'},
          {title: '9:16 — Tall vertical', value: '9/16'},
        ],
        layout: 'radio',
      },
      initialValue: '3/2',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
    },
    prepare({media, alt}) {
      return {
        title: 'Image Block',
        subtitle: alt || 'No description added',
        media,
      }
    },
  },
})
