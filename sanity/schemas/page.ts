import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  description: 'Create and manage pages for your website. Each page can have its own content blocks and settings.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The name of this page. This appears in browser tabs and search results.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The web address for this page. Click "Generate" to create one from the title. E.g. "about-us" creates yoursite.com/about-us',
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
      description: 'Optional large image that appears at the very top of the page, spanning the full width. Great for setting the mood.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          description: 'Describe what is shown for accessibility and search engines.',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Build your page by adding content blocks. Click "+ Add item" to add text, images, videos, quotes, and more. Drag to reorder.',
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
      title: 'Show in Navigation Menu',
      type: 'boolean',
      description: 'When enabled, this page appears in the main navigation at the top of the website.',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'What this page is called in the navigation menu. Leave empty to use the page title.',
      group: 'navigation',
    }),
    defineField({
      name: 'navOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Controls the position in the navigation menu. Lower numbers appear first (e.g. 10 before 20).',
      initialValue: 10,
      group: 'navigation',
    }),
    // Page settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'When disabled, this page is hidden from visitors but not deleted. Useful for drafts or seasonal content.',
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
