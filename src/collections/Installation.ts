import type { CollectionConfig } from 'payload'

export const Installation: CollectionConfig = {
  slug: 'installations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle'],
    livePreview: { url: '/' },
  },
  fields: [
    {
      name: 'index',
      label: 'Index',
      type: 'number',
      index: true,
      defaultValue: 0,
    },
    {
      name: 'title',
      label: 'Name of the installation',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
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
