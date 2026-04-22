import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: '1. Service Content', default: true },
    { name: 'experts', title: '2. Experts & FAQ' },
    { name: 'extra', title: '3. Additional Blocks' },
    { name: 'config', title: '4. Settings & SEO' },
    { name: 'legacy', title: '5. Legacy Content (Fallback)' },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Global across all audiences
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
    defineField({
      name: 'description',
      title: 'Short Description (for Cards)',
      type: 'text',
      group: 'basic',
      description: '1-2 sentences for the services listing page.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'overview',
      title: 'Global Overview',
      type: 'text',
      group: 'basic',
      description: 'Main introductory paragraph for the service page (shows for all audiences).',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),

    // ============================================================
    // AUDIENCE SECTIONS - Specific to Child, Teen, Adult
    // ============================================================
    defineField({
      name: 'audienceSections',
      title: 'Audience-Specific Details (Children, Teens, Adults)',
      type: 'array',
      group: 'basic',
      description: 'Add specific content for different age groups here. On the website, these appear as selectable tabs.',
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
            { 
              name: 'title', 
              type: 'string', 
              title: 'Section Title (Internal)',
              description: 'e.g., "For Children & Teens". Used for tabs on the website.'
            },
            {
              name: 'overview',
              type: 'text',
              title: '1. Specific Overview',
              description: 'Optional. Brief context specific to this age group.'
            },
            {
              name: 'whoIsItFor',
              type: 'array',
              title: '2. Is This Right for You or Your Loved Ones?',
              description: 'Checklist of symptoms or needs.',
              of: [{ type: 'string' }]
            },
            {
              name: 'benefits',
              type: 'array',
              title: '3. What You\'ll Gain (Benefits)',
              of: [{ type: 'string' }]
            },
            {
              name: 'expectations',
              type: 'array',
              title: '4. What to Expect (Process)',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: { title: 'title', audience: 'audienceType' },
            prepare({ title, audience }) {
              return {
                title: title || (audience ? audience.charAt(0).toUpperCase() + audience.slice(1) : 'New Audience Section'),
                subtitle: `Specific content for ${audience || 'unspecified'}`
              }
            }
          }
        })
      ]
    }),

    // ============================================================
    // SETTINGS & SEO
    // ============================================================
    defineField({
      name: 'popular',
      title: 'Featured / Popular',
      type: 'boolean',
      group: 'config',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      title: 'Is Therapy?',
      type: 'boolean',
      group: 'config',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'config',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
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
    // EXTRA BLOCKS
    // ============================================================
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'extra',
    }),
    defineField({
      name: 'format',
      title: 'Format / Location',
      type: 'string',
      group: 'extra',
    }),
    defineField({
      name: 'additionalSections',
      title: 'Additional Custom Blocks',
      type: 'array',
      group: 'extra',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'customBlock',
          fields: [
            { name: 'title', type: 'string', title: 'Block Title', validation: (rule) => rule.required() },
            { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }], validation: (rule) => rule.required() },
            { name: 'color', type: 'string', title: 'Bullet Color (Hex)', initialValue: '#7A9A7D' }
          ]
        })
      ]
    }),
    defineField({
      name: 'body',
      title: 'Additional Content (Rich Text)',
      type: 'array',
      group: 'extra',
      of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })],
    }),

    // ============================================================
    // LEGACY (Fallback fields)
    // ============================================================
    defineField({
      name: 'benefits',
      title: 'What You\'ll Gain (Legacy)',
      type: 'array',
      group: 'legacy',
      of: [{ type: 'string' }],
      hidden: ({ document }) => {
        const sections = document?.audienceSections as unknown[];
        return Array.isArray(sections) && sections.length > 0;
      },
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect (Legacy)',
      type: 'array',
      group: 'legacy',
      of: [{ type: 'string' }],
      hidden: ({ document }) => {
        const sections = document?.audienceSections as unknown[];
        return Array.isArray(sections) && sections.length > 0;
      },
    }),
    defineField({
      name: 'whoIsItForTitle',
      title: 'Who Is It For Title (Legacy)',
      type: 'string',
      group: 'legacy',
      hidden: ({ document }) => {
        const sections = document?.audienceSections as unknown[];
        return Array.isArray(sections) && sections.length > 0;
      },
    }),
    defineField({
      name: 'whoIsItFor',
      title: 'Who Is It For (Legacy)',
      type: 'array',
      group: 'legacy',
      of: [{ type: 'string' }],
      hidden: ({ document }) => {
        const sections = document?.audienceSections as unknown[];
        return Array.isArray(sections) && sections.length > 0;
      },
    }),
    defineField({
      name: 'ctaOverride',
      title: 'CTA Override',
      type: 'object',
      group: 'extra',
      fields: [
        { name: 'title', type: 'string', title: 'CTA Title' },
        { name: 'description', type: 'text', title: 'CTA Description' },
        { name: 'buttonText', type: 'string', title: 'Button Text' }
      ]
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
