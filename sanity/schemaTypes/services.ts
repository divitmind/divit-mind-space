import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: '1. Service Content', default: true },
    { name: 'experts', title: '2. Experts & FAQ' },
    { name: 'config', title: '4. Settings & SEO' },
  ],
  fields: [
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
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),

    // ============================================================
    // MODULAR AUDIENCE SECTIONS
    // ============================================================
    defineField({
      name: 'audienceSections',
      title: 'Audience Tabs (Children, Teens, Adults)',
      type: 'array',
      group: 'basic',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audienceBlock',
          fields: [
            { name: 'audienceType', type: 'string', title: 'Internal ID', options: { list: ['children', 'teens', 'adults'] }, validation: (rule) => rule.required() },
            { name: 'title', type: 'string', title: 'Tab Label', validation: (rule) => rule.required() },
            
            // Hero Section (Philosophy)
            {
              name: 'hero',
              type: 'object',
              title: 'Tab Hero (Top Section)',
              fields: [
                { name: 'shortDescription', type: 'text', title: 'Primary Outcome (Green Box)', rows: 3 },
                { name: 'overview', type: 'text', title: 'Clinical Overview (White Box)', rows: 3 },
              ]
            },

            // The Content Blocks Array - FULL FLEXIBILITY
            {
              name: 'contentBlocks',
              type: 'array',
              title: 'Page Content Blocks',
              description: 'Add, reorder, or delete sections. Use Duo-Grids for side-by-side lists or Clinical Index for the wide ledger style.',
              of: [
                // 1. DUO-GRID BLOCK (Side-by-side lists)
                defineArrayMember({
                  name: 'duoGridBlock',
                  type: 'object',
                  title: 'Duo-Grid (Two Columns)',
                  fields: [
                    {
                      name: 'leftColumn',
                      type: 'object',
                      fields: [
                        { name: 'title', type: 'string', title: 'Header' },
                        { name: 'kicker', type: 'string', title: 'Inline Kicker' },
                        { name: 'items', type: 'array', title: 'List Items', of: [{ type: 'string' }] },
                        { name: 'style', type: 'string', title: 'Bullet Style', options: { list: ['tick', 'number'] }, initialValue: 'tick' }
                      ]
                    },
                    {
                      name: 'rightColumn',
                      type: 'object',
                      fields: [
                        { name: 'title', type: 'string', title: 'Header' },
                        { name: 'kicker', type: 'string', title: 'Inline Kicker' },
                        { name: 'items', type: 'array', title: 'List Items', of: [{ type: 'string' }] },
                        { name: 'style', type: 'string', title: 'Bullet Style', options: { list: ['tick', 'number'] }, initialValue: 'tick' }
                      ]
                    }
                  ],
                  preview: {
                    select: { t1: 'leftColumn.title', t2: 'rightColumn.title' },
                    prepare({ t1, t2 }) { return { title: `Duo-Grid: ${t1} & ${t2}` } }
                  }
                }),

                // 2. CLINICAL INDEX BLOCK (The Wide Ledger)
                defineArrayMember({
                  name: 'clinicalIndexBlock',
                  type: 'object',
                  title: 'Clinical Index (Ledger Style)',
                  fields: [
                    { name: 'title', type: 'string', title: 'Section Header' },
                    { name: 'intro', type: 'text', title: 'Intro Text (Optional)', rows: 2 },
                    {
                      name: 'groups',
                      type: 'array',
                      title: 'Categories',
                      of: [
                        defineArrayMember({
                          type: 'object',
                          fields: [
                            { name: 'heading', type: 'string', title: 'Category Name' },
                            { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }] }
                          ]
                        })
                      ]
                    }
                  ],
                  preview: {
                    select: { title: 'title' },
                    prepare({ title }) { return { title: `Clinical Index: ${title}` } }
                  }
                }),

                // 3. FULL WIDTH CHECKLIST
                defineArrayMember({
                  name: 'fullWidthListBlock',
                  type: 'object',
                  title: 'Full Width Checklist',
                  fields: [
                    { name: 'title', type: 'string', title: 'Header' },
                    { name: 'intro', type: 'text', title: 'Intro Text', rows: 2 },
                    { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }] },
                    { name: 'backgroundColor', type: 'string', title: 'Style', options: { list: [{title: 'White Surface', value: 'white'}, {title: 'Sage Tint', value: 'sage'}] }, initialValue: 'white' }
                  ],
                  preview: {
                    select: { title: 'title' },
                    prepare({ title }) { return { title: `List: ${title}` } }
                  }
                })
              ]
            }
          ]
        })
      ]
    }),

    // EXPERTS & FAQ
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
    defineField({
      name: 'additionalSections',
      title: 'Additional Full-Width Sections',
      type: 'array',
      group: 'basic',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'intro', type: 'text', title: 'Intro Text', rows: 2 },
            { name: 'items', type: 'array', title: 'List Items', of: [{ type: 'string' }] },
            { name: 'color', type: 'string', title: 'Background Style', options: { list: [{title: 'White', value: 'white'}, {title: 'Sage', value: 'sage'}] }, initialValue: 'white' }
          ]
        })
      ]
    }),
  ],
})
