import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Gallery Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'The Story / Caption',
      type: 'text',
      rows: 3,
      description: 'The emotional story behind this moment.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Context Tag',
      type: 'string',
      description: 'e.g., School Orientation, Therapy Session',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'Empowering Educators', value: 'Empowering Educators' },
          { title: 'Nurturing Growth', value: 'Nurturing Growth' },
          { title: 'Real Connections', value: 'Real Connections' },
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Moment',
      type: 'boolean',
      description: 'Give this image more prominence in the grid',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'title',
      category: 'categories.0',
    },
    prepare({ media, title, category }) {
      return {
        title: title || 'Untitled Moment',
        subtitle: category || 'Uncategorized',
        media,
      }
    },
  },
})
