import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Enter any category name (e.g., "Founders", "Artists", "Advisors")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      description: 'Optional biography text that appears when expanded',
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
                  {name: 'href', type: 'url', title: 'URL', validation: (Rule: any) => Rule.uri({allowRelative: true})},
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
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Photo description',
          description: 'Describe who is in the photo. This helps visually impaired visitors. E.g. "Portrait of Maria Rossi"',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order within the category',
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