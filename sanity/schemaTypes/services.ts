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
      title: 'Global Meta Description',
      type: 'text',
      group: 'basic',
      description: 'Used for search engines and social sharing.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'overview',
      title: 'Global Overview',
      type: 'text',
      group: 'basic',
      description: 'Main introductory paragraph that appears at the top of the page.',
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
    // AUDIENCE SECTIONS - THE PRIMARY CONTAINER
    // ============================================================
    defineField({
      name: 'audienceSections',
      title: 'Audience-Specific Details (Children, Teens, Adults)',
      type: 'array',
      group: 'basic',
      description: 'Everything for a specific audience (Children, Teens, or Adults) goes here.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audienceBlock',
          fields: [
            {
              name: 'audienceType',
              type: 'string',
              title: 'Primary Audience (Internal Selection)',
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
              title: 'Tab Label (e.g., "Children")',
              validation: (rule) => rule.required()
            },
            {
              name: 'shortDescription',
              type: 'text',
              title: 'Primary Outcome Statement',
              description: 'The high-impact philosophical line that appears in the centered box.',
            },
            {
              name: 'overview',
              type: 'text',
              title: 'Specific Overview',
              description: 'Appears next to the primary outcome (if both provided).'
            },
            {
              name: 'benefits',
              type: 'array',
              title: 'Section 1: What You\'ll Gain',
              description: 'List of 6 bullet points for the top grid.',
              of: [{ type: 'string' }]
            },
            {
              name: 'expectations',
              type: 'array',
              title: 'Section 2: What to Expect',
              description: 'The process-focused checklist.',
              of: [{ type: 'string' }]
            },
            {
              name: 'whoIsItFor',
              type: 'array',
              title: 'Section 3: Is This the Right Space?',
              description: 'The needs-focused checklist.',
              of: [{ type: 'string' }]
            },
            // Dedicated Dedicated Blocks as requested
            {
              name: 'supportedItemsTitle',
              type: 'string',
              title: 'Section 4: Custom Heading',
              description: 'Defaults to "Individuals We Support" if left empty.'
            },
            {
              name: 'supportedItemsIntro',
              type: 'text',
              title: 'Section 4: Intro Text',
              description: 'Brief paragraph appearing below the heading.'
            },
            {
              name: 'supportedItems',
              type: 'array',
              title: 'Section 4: List Items',
              description: 'Start with ## for group headers (e.g. "## Speech Development").',
              of: [{ type: 'string' }]
            },
            {
              name: 'approachItems',
              type: 'array',
              title: 'Section 5: Our Approach',
              description: 'e.g., "Child-Led, Relationship-Based: We follow..."',
              of: [{ type: 'string' }]
            },
            {
              name: 'whyChooseItems',
              type: 'array',
              title: 'Section 6: Why Families Choose Us',
              description: 'List of reasons why families trust Divit MindSpace.',
              of: [{ type: 'string' }]
            },
            {
              name: 'additionalSections',
              type: 'array',
              title: 'Custom Additional Sections',
              description: 'Extra blocks for unique service needs.',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Section Title' },
                    { name: 'items', type: 'array', title: 'List Items', of: [{ type: 'string' }] },
                    { name: 'color', type: 'string', title: 'Dot Color (Hex)', initialValue: '#7A9A7D' }
                  ]
                })
              ]
            }
          ],
          preview: {
            select: { title: 'title', audience: 'audienceType' },
            prepare({ title, audience }) {
              return {
                title: title || (audience ? audience.charAt(0).toUpperCase() + audience.slice(1) : 'New Audience Section'),
                subtitle: `Audience: ${audience || 'unspecified'}`
              }
            }
          }
        })
      ]
    }),

    // ============================================================
    // EXPERTS & FAQ
    // ============================================================
    defineField({
      name: 'specialists',
      title: 'Assigned Specialists',
      type: 'array',
      group: 'experts',
      of: [{ type: 'reference', to: [{ type: 'specialist' }] }]
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
    // EXTRA & SEO
    // ============================================================
    defineField({
      name: 'format',
      title: 'Format / Location',
      type: 'string',
      group: 'extra',
    }),
    defineField({
      name: 'body',
      title: 'Bottom Page Content (Rich Text)',
      type: 'array',
      group: 'extra',
      of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })],
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
  ],
})
