import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'agendaItem',
  title: 'Agenda Item',
  type: 'document',
  description: 'Add events or agenda items. Each appears as an expandable section on the Agenda page.',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'The name of this event or activity, e.g. "Summer Gathering" or "Art Workshop".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Description',
      type: 'array',
      description: 'Describe what happens at this event. Include dates, times, and what guests can expect.',
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
                    description: 'Link to more information or registration.',
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
      title: 'Register/RSVP Button',
      type: 'object',
      description: 'Optional button for registration or enquiries.',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'E.g. "Register Now", "RSVP", "Get Tickets".',
        },
        {
          name: 'url',
          title: 'Button Link',
          type: 'url',
          description: 'Where the button leads (registration page, email, ticket site, etc.).',
        },
      ],
    }),
    defineField({
      name: 'carouselMedia',
      title: 'Photos & Videos',
      type: 'array',
      description: 'Add images or videos related to this event (past events, venue photos, etc.). Visitors can swipe through them.',
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
              description: 'Describe what\'s shown for accessibility. E.g. "Guests enjoying dinner on the terrace".',
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
      description: 'Controls the position on the Agenda page. Lower numbers appear first (e.g. 1 before 2).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this event was added. Used for sorting if needed.',
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
