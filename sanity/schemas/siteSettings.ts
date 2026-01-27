import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'navigation', title: 'Navigation', default: true},
    {name: 'social', title: 'Social Media'},
  ],
  fields: [
    // Navigation toggles for special pages
    defineField({
      name: 'showAgenda',
      title: 'Show Agenda in Navigation',
      type: 'boolean',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'agendaLabel',
      title: 'Agenda Navigation Label',
      type: 'string',
      initialValue: 'Agenda',
      group: 'navigation',
    }),
    defineField({
      name: 'agendaOrder',
      title: 'Agenda Navigation Order',
      type: 'number',
      initialValue: 20,
      group: 'navigation',
    }),
    defineField({
      name: 'showStays',
      title: 'Show Stays in Navigation',
      type: 'boolean',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'staysLabel',
      title: 'Stays Navigation Label',
      type: 'string',
      initialValue: 'Stays',
      group: 'navigation',
    }),
    defineField({
      name: 'staysOrder',
      title: 'Stays Navigation Order',
      type: 'number',
      initialValue: 30,
      group: 'navigation',
    }),
    defineField({
      name: 'showJourney',
      title: 'Show Journey in Navigation',
      type: 'boolean',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'journeyLabel',
      title: 'Journey Navigation Label',
      type: 'string',
      initialValue: 'Journey',
      group: 'navigation',
    }),
    defineField({
      name: 'journeyOrder',
      title: 'Journey Navigation Order',
      type: 'number',
      initialValue: 40,
      group: 'navigation',
    }),
    defineField({
      name: 'showMembers',
      title: 'Show Members in Navigation',
      type: 'boolean',
      initialValue: true,
      group: 'navigation',
    }),
    defineField({
      name: 'membersLabel',
      title: 'Members Navigation Label',
      type: 'string',
      initialValue: 'Members',
      group: 'navigation',
    }),
    defineField({
      name: 'membersOrder',
      title: 'Members Navigation Order',
      type: 'number',
      initialValue: 50,
      group: 'navigation',
    }),
    // Social media
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://instagram.com',
      group: 'social',
    }),
    defineField({
      name: 'showInstagram',
      title: 'Show Instagram in Navigation',
      type: 'boolean',
      initialValue: true,
      group: 'social',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
