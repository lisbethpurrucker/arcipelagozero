import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  description: 'Add team members, artists, advisors, or anyone you want to feature on the Members page.',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'The person\'s name as it should appear on the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group members together under a heading. Type any category name (e.g. "Founders", "Artists", "Advisors"). Members with the same category are grouped together.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      description: 'A short bio that appears when visitors click on this member. Keep it concise and engaging.',
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
                    description: 'Link to their website, portfolio, or social media.',
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
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'A headshot or portrait. Square photos work best. Use the crop/hotspot tool to focus on their face.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Photo Description',
          description: 'Describe who is in the photo. E.g. "Portrait of Maria Rossi"',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the position within this category. Lower numbers appear first (e.g. 1 before 2).',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Category & Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'}
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      order: 'order',
      media: 'photo',
    },
    prepare({title, category, order, media}) {
      return {
        title: title,
        subtitle: `${category} • Order: ${order}`,
        media,
      }
    },
  },
})
