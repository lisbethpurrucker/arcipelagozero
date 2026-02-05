import {defineField, defineType} from 'sanity'

export const socialPlatforms = [
  {title: 'Instagram', value: 'instagram'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'X (Twitter)', value: 'twitter'},
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'TikTok', value: 'tiktok'},
  {title: 'Pinterest', value: 'pinterest'},
  {title: 'Vimeo', value: 'vimeo'},
  {title: 'Threads', value: 'threads'},
  {title: 'Bluesky', value: 'bluesky'},
] as const

export default defineType({
  name: 'socialLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Select the social media platform.',
      options: {
        list: socialPlatforms.map(p => ({title: p.title, value: p.value})),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      description: 'The full URL to your profile on this platform.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'When enabled, this link appears in the navigation bar.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
      showInNav: 'showInNav',
    },
    prepare({platform, url, showInNav}) {
      const platformInfo = socialPlatforms.find(p => p.value === platform)
      return {
        title: platformInfo?.title || platform || 'Social Link',
        subtitle: `${url || 'No URL'}${showInNav ? '' : ' (hidden)'}`,
      }
    },
  },
})
