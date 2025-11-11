import type { CollectionConfig } from 'payload'

export const Installation: CollectionConfig = {
  slug: 'installations',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'richText',
      required: true,
    },
  ],
}
