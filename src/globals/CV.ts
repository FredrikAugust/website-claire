import type { GlobalConfig } from 'payload'

export const CV: GlobalConfig = {
  slug: 'cv',
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'entries',
          type: 'array',
          fields: [
            { name: 'year', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'venue', type: 'text' },
            { name: 'location', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'sidebarSections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'entries',
          type: 'array',
          fields: [
            { name: 'year', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'details', type: 'text' },
          ],
        },
      ],
    },
  ],
}
