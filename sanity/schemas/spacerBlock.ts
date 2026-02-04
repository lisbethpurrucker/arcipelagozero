import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'spacerBlock',
  title: 'Spacer Block',
  type: 'object',
  description: 'Add extra vertical space between content blocks, optionally with a dividing line. Use this to create visual separation.',
  fields: [
    defineField({
      name: 'size',
      title: 'Space Size',
      type: 'string',
      description: 'How much vertical space to add.',
      options: {
        list: [
          {title: 'Small (a little breathing room)', value: 'small'},
          {title: 'Medium (standard section break)', value: 'medium'},
          {title: 'Large (major section break)', value: 'large'},
          {title: 'Extra Large (dramatic pause)', value: 'xlarge'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show Dividing Line',
      type: 'boolean',
      description: 'Add a horizontal line in the middle of the space. Good for separating distinct sections.',
      initialValue: false,
    }),
    defineField({
      name: 'dividerColor',
      title: 'Divider Color',
      type: 'string',
      description: 'The color of the dividing line.',
      options: {
        list: [
          {title: 'Teal (matches brand)', value: 'teal'},
          {title: 'Sand (subtle, warm)', value: 'sand'},
          {title: 'Light Gray (minimal)', value: 'gray'},
        ],
      },
      initialValue: 'gray',
      hidden: ({parent}) => !parent?.showDivider,
    }),
  ],
  preview: {
    select: {
      size: 'size',
      showDivider: 'showDivider',
    },
    prepare({size, showDivider}) {
      return {
        title: 'Spacer Block',
        subtitle: `${size || 'medium'}${showDivider ? ' with divider' : ''}`,
      }
    },
  },
})
