import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery Block',
  type: 'object',
  description: 'Display multiple images in a grid. Great for photo galleries, portfolios, or showcasing multiple views.',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add the images you want to display. Drag to reorder them. Click on any image to set its crop/hotspot.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Image Description',
              description: 'Describe what is shown in this image for accessibility and search engines.',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      description: 'How many images to show per row on desktop. On mobile, this automatically adjusts to fit the screen.',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'gap',
      title: 'Space Between Images',
      type: 'string',
      description: 'Choose how much space appears between images. "None" creates a seamless grid.',
      options: {
        list: [
          {title: 'None (seamless)', value: 'none'},
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      columns: 'columns',
    },
    prepare({images, columns}) {
      const count = images?.length || 0
      return {
        title: 'Gallery Block',
        subtitle: `${count} image${count !== 1 ? 's' : ''} in ${columns} columns`,
      }
    },
  },
})
