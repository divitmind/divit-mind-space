import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: '[REQUIRED] Gallery Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '[REQUIRED] Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: '[AUTO] Image Title (Optional)',
      type: 'string',
      description: 'Leave blank to use the Smart Engine based on Location/Event.',
    }),
    defineField({
      name: 'locationEvent',
      title: '[REQUIRED] Location / Name of Event',
      type: 'string',
      description: 'e.g., Bishop Cotton, DPS East, Child Development Centre, WhatsApp Moment',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      title: '[AUTO] The Story / Caption (Optional)',
      type: 'text',
      rows: 3,
      description: 'Leave blank to use the Smart Engine based on Location/Event.',
    }),
    defineField({
      name: 'tag',
      title: '[AUTO] Context Tag',
      type: 'string',
      description: 'e.g., School Orientation, Therapy Session',
    }),
    defineField({
      name: 'categories',
      title: '[REQUIRED] Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryCategory' }] }],
      description: 'Select one or more categories for this image.',
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
