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
      description: '📐 RECOMMENDED: 1200×800px or larger. Works with any aspect ratio (portrait/landscape). MIN: 600×400px. Use hotspot on faces so cropping looks good in the grid.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '[REQUIRED] Alternative text',
          description: 'Describe what is happening in the image (e.g., "Child playing with therapist during session")',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationEvent',
      title: '[REQUIRED] Location / Event Name',
      type: 'string',
      description: 'CRITICAL: Used to pick the right Smart Story. e.g., Bishop Cotton, DPS East, CDC, etc.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: '✨ [AUTO] Image Title (Optional)',
      type: 'string',
      description: 'LEAVE BLANK to use the Smart Storytelling engine.',
    }),
    defineField({
      name: 'story',
      title: '✨ [AUTO] The Story / Caption (Optional)',
      type: 'text',
      rows: 3,
      description: 'LEAVE BLANK to use the Smart Storytelling engine.',
    }),
    defineField({
      name: 'tag',
      title: '✨ [AUTO] Context Tag',
      type: 'string',
      description: 'e.g., School Orientation, Therapy Session',
    }),
    defineField({
      name: 'categories',
      title: '[REQUIRED] Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryCategory' }] }],
      description: 'Select at least one category.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Moment',
      type: 'boolean',
      description: 'Highlight this image in the grid',
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
      location: 'locationEvent',
      category: 'categories.0.title',
    },
    prepare({ media, title, location, category }) {
      return {
        title: title || '✨ Auto-Generated Title',
        subtitle: `${location || 'No Location'} | ${category || 'Uncategorized'}`,
        media,
      }
    },
  },
})
