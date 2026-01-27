import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'spacerBlock',
  title: 'Spacer Block',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (16px)', value: 'small'},
          {title: 'Medium (32px)', value: 'medium'},
          {title: 'Large (64px)', value: 'large'},
          {title: 'Extra Large (96px)', value: 'xlarge'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show Divider Line',
      type: 'boolean',
      description: 'Display a horizontal line in the middle of the spacer',
      initialValue: false,
    }),
    defineField({
      name: 'dividerColor',
      title: 'Divider Color',
      type: 'string',
      options: {
        list: [
          {title: 'Teal', value: 'teal'},
          {title: 'Sand', value: 'sand'},
          {title: 'Light Gray', value: 'gray'},
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
        media: () => '↕️',
      }
    },
  },
})
