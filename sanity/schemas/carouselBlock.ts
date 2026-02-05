import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carouselBlock',
  title: 'Carousel Block',
  type: 'object',
  description: 'Display a sliding carousel of cards with images, dates, and titles. Great for showcasing events, news, or featured content.',
  fields: [
    defineField({
      name: 'items',
      title: 'Carousel Items',
      type: 'array',
      description: 'Add the cards you want to display in the carousel. Each card can have an image, date, title, and link.',
      of: [
        {
          type: 'object',
          name: 'carouselItem',
          title: 'Carousel Item',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'The main image for this card. Use a vertical/portrait image for best results.',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'A short line above the title, like a date or category (e.g., "10-14 September 2025").',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The main title for this card.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Optional link when someone clicks this card. Leave empty if the card shouldn\'t be clickable.',
              validation: (Rule) => Rule.uri({allowRelative: true}),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'autoSwipe',
      title: 'Auto-Swipe',
      type: 'boolean',
      description: 'Turn this on to make the carousel automatically move to the next slide. Visitors can still swipe manually.',
      initialValue: true,
    }),
    defineField({
      name: 'autoSwipeInterval',
      title: 'Auto-Swipe Speed',
      type: 'number',
      description: 'How many seconds to wait before moving to the next slide. Only applies if Auto-Swipe is turned on.',
      options: {
        list: [
          {title: '3 seconds', value: 3},
          {title: '5 seconds', value: 5},
          {title: '7 seconds', value: 7},
          {title: '10 seconds', value: 10},
        ],
      },
      initialValue: 5,
      hidden: ({parent}) => !parent?.autoSwipe,
    }),
    defineField({
      name: 'showButton',
      title: 'Show Button Below',
      type: 'boolean',
      description: 'Turn this on to display a call-to-action button below the carousel.',
      initialValue: false,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'The text that appears on the button.',
      hidden: ({parent}) => !parent?.showButton,
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button Link',
      type: 'url',
      description: 'Where the button should link to.',
      validation: (Rule) => Rule.uri({allowRelative: true}),
      hidden: ({parent}) => !parent?.showButton,
    }),
  ],
  preview: {
    select: {
      items: 'items',
      autoSwipe: 'autoSwipe',
    },
    prepare({items, autoSwipe}) {
      const count = items?.length || 0
      return {
        title: 'Carousel Block',
        subtitle: `${count} item${count !== 1 ? 's' : ''}${autoSwipe ? ' • Auto-swipe' : ''}`,
      }
    },
  },
})
