import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Optional header/hero image displayed at the top of the page',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'galleryBlock'},
        {type: 'embedBlock'},
        {type: 'mixedBlock'},
        {type: 'quoteBlock'},
        {type: 'ctaBlock'},
        {type: 'spacerBlock'},
      ],
      group: 'content',
    }),
    // Navigation settings
    defineField({
      name: 'showInNav',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Display this page in the main navigation menu',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'Custom label for navigation (uses page title if empty)',
      group: 'navigation',
    }),
    defineField({
      name: 'navOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Order in navigation menu (lower numbers appear first)',
      initialValue: 10,
      group: 'navigation',
    }),
    // Page settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Unpublished pages are hidden from the site but not deleted',
      initialValue: true,
      group: 'settings',
    }),
  ],
  orderings: [
    {
      title: 'Nav Order',
      name: 'navOrder',
      by: [{field: 'navOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isPublished: 'isPublished',
      showInNav: 'showInNav',
    },
    prepare({title, slug, isPublished, showInNav}) {
      const status = []
      if (isPublished === false) status.push('Hidden')
      if (showInNav === false) status.push('Not in nav')
      return {
        title: title,
        subtitle: `/${slug}${status.length ? ' • ' + status.join(', ') : ''}`,
      }
    },
  },
})
