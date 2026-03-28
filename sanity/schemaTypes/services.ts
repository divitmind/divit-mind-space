import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Service Details' },
    { name: 'seo', title: 'SEO (Optional)' },
  ],
  fields: [
    // === BASIC INFO ===
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      group: 'basic',
      description: 'Select the service category.',
      options: {
        list: [
          { title: 'Assessments', value: 'assessments' },
          { title: 'Therapy', value: 'therapy' },
          { title: 'Guidance', value: 'guidance' },
          { title: 'Programs', value: 'programs' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Card Description',
      group: 'basic',
      rows: 3,
      description: 'Short text for service cards (max 200 chars)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'basic',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      title: 'Featured Service',
      group: 'basic',
      description: 'Show at top of listings',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      type: 'boolean',
      title: 'Therapy Badge',
      group: 'basic',
      description: 'Show therapy badge',
      initialValue: false,
    }),

    // === SERVICE DETAILS ===
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'Detailed description shown on service page',
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits (What You\'ll Gain)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List 4-6 key benefits',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List the process steps',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'whoIsItFor',
      title: 'Who Is It For',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Describe who benefits from this service',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'content',
      description: 'e.g., "45-minute sessions"',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      group: 'content',
      description: 'e.g., "In-person at our center"',
    }),
    defineField({
      name: 'body',
      title: 'Additional Content (Optional)',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'URL',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Custom title for search engines (50-60 characters)',
        },
        {
          name: 'metaDescription',
          type: 'string',
          title: 'Meta Description',
          description: 'Custom description for search engines (150-160 characters)',
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Custom image for social media sharing',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      return {
        title: title,
        subtitle: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'No category',
        media: media,
      }
    },
  },
})