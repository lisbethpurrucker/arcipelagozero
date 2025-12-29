import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'crmContact',
  title: 'CRM Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      email: 'email',
      status: 'status',
    },
    prepare({title, email, status}) {
      return {
        title: title,
        subtitle: `${email} • ${status}`,
        media: () => '👤',
      }
    },
  },
})
