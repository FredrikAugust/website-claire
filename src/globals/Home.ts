import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'hero',
      type: 'group',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'carousel',
      type: 'upload',
      hasMany: true,
      relationTo: 'media',
      required: true,
    },
    {
      name: 'aboutMe',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
