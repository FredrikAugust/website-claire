import type { CollectionConfig } from 'payload'

export const Installation: CollectionConfig = {
  slug: 'installations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle'],
  },
  fields: [
    {
      name: 'index',
      label: 'Index',
      admin: {
        description: 'A lower number will make this appear higher in the list of installations.',
      },
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
    {
      name: 'files',
      type: 'array',
      admin: {
        description: 'Additional files the visitor can download. Such as slide decks.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
