import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Global settings for your website, including social media links.',
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      description: 'Add links to your social media profiles. Toggle "Show in Navigation" to control which ones appear in the nav bar.',
      of: [{type: 'socialLink'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global social media settings',
      }
    },
  },
})
