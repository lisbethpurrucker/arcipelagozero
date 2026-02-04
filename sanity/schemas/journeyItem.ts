import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'journeyItem',
  title: 'Journey',
  type: 'document',
  description: 'Add experiences or journey options. Each appears as an expandable section on the Journey page.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this journey or experience, e.g. "Island Exploration" or "Culinary Tour".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Description',
      type: 'array',
      description: 'Describe this journey. What will guests experience? What makes it unique? Use the toolbar for formatting.',
      validation: (Rule) => Rule.required(),
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
                    description: 'Link to more information or booking page.',
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
      title: 'Book/Enquire Button',
      type: 'object',
      description: 'Optional button for booking or enquiries.',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'E.g. "Book Now", "Enquire", "Learn More".',
        },
        {
          name: 'url',
          title: 'Button Link',
          type: 'url',
          description: 'Where the button leads (booking page, email, contact form, etc.).',
        },
      ],
    }),
    defineField({
      name: 'carouselMedia',
      title: 'Photos & Videos',
      type: 'array',
      description: 'Add images or videos that showcase this journey. Visitors can swipe through them. Drag to reorder.',
      of: [
        {
          type: 'image',
          title: 'Photo',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Description',
              description: 'Describe what\'s shown for accessibility. E.g. "Group hiking along the coast".',
            },
          ],
        },
        {
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Description',
              description: 'Describe the video content for accessibility.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the position on the Journey page. Lower numbers appear first (e.g. 1 before 2).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this journey was added. Used for sorting if needed.',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      date: 'publishedAt',
    },
    prepare({title, order, date}) {
      return {
        title: title,
        subtitle: `Order: ${order} • ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})
