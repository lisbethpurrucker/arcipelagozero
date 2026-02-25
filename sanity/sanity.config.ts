import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {DuplicatePageAction} from './actions/DuplicatePageAction'

export default defineConfig({
  name: 'default',
  title: 'Minimal Site',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'page') {
        return [...prev, DuplicatePageAction]
      }
      return prev
    },
  },
})
