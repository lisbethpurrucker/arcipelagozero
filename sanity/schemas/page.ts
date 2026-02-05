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
      description: 'The web address for this page. Click "Generate" to create one from the title. For example, "about-us" creates yoursite.com/about-us.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'isNavParentOnly',
      title: 'Navigation Parent Only',
      type: 'boolean',
      description: 'Turn this on if this page is only meant to group other pages in the menu (like "Stays" grouping "Creative Residency" and "Chill Stay"). This page won\'t have any content — it just acts as a dropdown menu in the navigation. Visitors who try to visit this page directly will be sent to the homepage.',
      initialValue: false,
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
          description: 'Describe what is shown in the image. This helps visually impaired visitors and improves search rankings.',
        },
      ],
      group: 'content',
      hidden: ({document}) => document?.isNavParentOnly === true,
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
        {type: 'carouselBlock'},
        {type: 'embedBlock'},
        {type: 'mixedBlock'},
        {type: 'quoteBlock'},
        {type: 'ctaBlock'},
        {type: 'spacerBlock'},
      ],
      group: 'content',
      hidden: ({document}) => document?.isNavParentOnly === true,
    }),
    // Navigation settings
    defineField({
      name: 'showInNav',
      title: 'Show in Navigation Menu',
      type: 'boolean',
      description: 'Turn this on to make this page appear in the main navigation menu at the top of the website.',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'What this page is called in the navigation menu. Leave empty to use the page title. Useful if you want a shorter name in the menu.',
      group: 'navigation',
    }),
    defineField({
      name: 'navOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Controls where this page appears in the navigation menu. Lower numbers appear first. For example, a page with order 10 appears before one with order 20.',
      initialValue: 10,
      group: 'navigation',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'Choose a parent page to nest this page under. This page will appear in the parent\'s dropdown menu, and its URL will include the parent\'s slug (e.g., /stays/creative-residency).',
      options: {
        filter: ({document}) => ({
          filter: '_id != $id && !defined(parent)',
          params: {id: document._id},
        }),
      },
      group: 'navigation',
    }),
    // Page settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Turn this off to hide this page from visitors without deleting it. Useful for drafts or seasonal content you want to bring back later.',
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
      parentSlug: 'parent.slug.current',
      isPublished: 'isPublished',
      showInNav: 'showInNav',
      isNavParentOnly: 'isNavParentOnly',
    },
    prepare({title, slug, parentSlug, isPublished, showInNav, isNavParentOnly}) {
      const status = []
      if (isNavParentOnly) status.push('Nav parent only')
      if (isPublished === false) status.push('Hidden')
      if (showInNav === false) status.push('Not in nav')
      const path = parentSlug ? `/${parentSlug}/${slug}` : `/${slug}`
      return {
        title: title,
        subtitle: `${path}${status.length ? ' • ' + status.join(', ') : ''}`,
      }
    },
  },
})
