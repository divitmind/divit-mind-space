import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
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
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description for SEO and service card previews (150-200 characters recommended)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'image',
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
    defineField({
      name: 'popular',
      type: 'boolean',
      title: 'Popular',
      description: 'Mark this service as popular to feature it prominently.',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      type: 'boolean',
      title: 'Is Therapy',
      description: 'Mark this service as therapy to feature it prominently.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Select the service category for filtering and navigation.',
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
      name: 'body',
      type: 'array',
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