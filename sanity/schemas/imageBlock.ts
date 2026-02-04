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
