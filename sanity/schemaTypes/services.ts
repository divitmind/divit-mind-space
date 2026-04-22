import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: '1. Basic Info', default: true },
    { name: 'content', title: '2. Service Details' },
    { name: 'experts', title: '3. Experts & FAQ' },
    { name: 'cta', title: '4. CTA Override' },
    { name: 'seo', title: '5. SEO (Optional)' },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Required fields for service listing
    // ============================================================
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      description: 'Brief overview for service cards (1-2 sentences).',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
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
      title: 'Featured / Popular',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      title: 'Is Therapy?',
      type: 'boolean',
      group: 'basic',
      description: 'Used for homepage grouping.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Assessments', value: 'assessments' },
          { title: 'Therapy', value: 'therapy' },
          { title: 'Guidance', value: 'guidance' },
          { title: 'Programs', value: 'programs' },
          { title: 'Physiotherapy', value: 'physiotherapy' },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    // ============================================================
    // CONTENT - Rich content for the detail page
    // ============================================================
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      group: 'content',
      description: 'Detailed introductory paragraph for the service page.',
    }),
    defineField({
      name: 'benefits',
      title: 'What You\'ll Gain',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List of benefits or outcomes. Each item appears as a bullet.',
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List of steps or process details. Each item appears as a bullet.',
    }),
    defineField({
      name: 'whoIsItForTitle',
      title: 'Who Is It For Title',
      type: 'string',
      group: 'content',
      initialValue: 'Is This Right for You or Your Loved Ones?',
    }),
    defineField({
      name: 'whoIsItFor',
      title: 'Who Is It For',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Describe who benefits from this service.',
    }),
    defineField({
      name: 'audienceSections',
      title: 'Audience-Specific Details',
      type: 'array',
      group: 'content',
      description: 'Add specific sections for Children, Teens, or Adults if this service caters differently to them.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audienceBlock',
          fields: [
            {
              name: 'audienceType',
              type: 'string',
              title: 'Audience Type',
              options: {
                list: [
                  { title: 'Children', value: 'children' },
                  { title: 'Teens', value: 'teens' },
                  { title: 'Adults', value: 'adults' },
                ]
              },
              validation: (rule) => rule.required()
            },
            { name: 'title', type: 'string', title: 'Section Title (e.g., "For Children & Teens")' },
            { name: 'overview', type: 'text', title: 'Overview' },
            {
              name: 'benefits',
              type: 'array',
              title: 'What You\'ll Gain',
              of: [{ type: 'string' }]
            },
            {
              name: 'expectations',
              type: 'array',
              title: 'What to Expect',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: { title: 'title', audience: 'audienceType' },
            prepare({ title, audience }) {
              return {
                title: title || audience.charAt(0).toUpperCase() + audience.slice(1),
                subtitle: `Specific details for ${audience}`
              }
            }
          }
        })
      ]
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'content',
      description: 'e.g., "45-minute sessions", "2-hour workshop"',
    }),
    defineField({
      name: 'format',
      title: 'Format / Location',
      type: 'string',
      group: 'content',
      description: 'e.g., "In-person at our center", "Online sessions available"',
    }),
    defineField({
      name: 'additionalSections',
      title: 'Additional Custom Blocks',
      type: 'array',
      group: 'content',
      description: 'Add extra "What to Expect" style boxes with custom headers and dots.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'customBlock',
          title: 'Custom Content Block',
          fields: [
            { name: 'title', type: 'string', title: 'Block Title', validation: (rule) => rule.required() },
            {
              name: 'items',
              type: 'array',
              title: 'List Items (Dots)',
              of: [{ type: 'string' }],
              validation: (rule) => rule.required().min(1)
            },
            {
              name: 'color',
              type: 'string',
              title: 'Bullet Color (Hex)',
              description: 'Hex code for the dots (e.g., #7A9A7D). Defaults to brand green if empty.',
              initialValue: '#7A9A7D'
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'body',
      title: 'Additional Content',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),

    // ============================================================
    // EXPERTS & FAQ
    // ============================================================
    defineField({
      name: 'onDemand',
      title: 'On-Demand Service',
      type: 'boolean',
      group: 'experts',
      initialValue: false,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'experts',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' }
          ]
        })
      ]
    }),

    // ============================================================
    // CTA & SEO
    // ============================================================
    defineField({
      name: 'ctaOverride',
      title: 'CTA Override',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'title', type: 'string', title: 'CTA Title' },
        { name: 'description', type: 'text', title: 'CTA Description' },
        { name: 'buttonText', type: 'string', title: 'Button Text' }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
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
        subtitle: category,
        media: media,
      }
    },
  },
})
