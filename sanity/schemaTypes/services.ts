import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Service Content' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    // ============================================
    // BASIC INFO GROUP
    // ============================================
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'basic',
      description: 'The name of the service (e.g., "Speech Therapy", "Psychometric Assessments")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'The URL-friendly version of the title. Click "Generate" to auto-create.',
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
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Brief description shown on service cards (150-200 characters). This appears on the Services listing page.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      description: 'Select which category this service belongs to.',
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
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'basic',
      description: 'Main image for this service. Recommended size: 800x600px.',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility (e.g., "Child in speech therapy session")',
        },
      ],
    }),
    defineField({
      name: 'popular',
      title: 'Featured Service',
      type: 'boolean',
      group: 'basic',
      description: 'Toggle ON to feature this service prominently on the website.',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      title: 'Is Therapy Service',
      type: 'boolean',
      group: 'basic',
      description: 'Toggle ON if this is a therapy service (auto-set based on category).',
      initialValue: false,
    }),

    // ============================================
    // SERVICE CONTENT GROUP
    // ============================================
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'Detailed description of this service. Explain what the service is and how it helps. This appears at the top of the service detail page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits (What You\'ll Gain)',
      type: 'array',
      group: 'content',
      description: 'List the key benefits of this service. Each item appears as a bullet point. Add 4-6 benefits.',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect',
      type: 'array',
      group: 'content',
      description: 'List the steps or process involved. Each item appears as a numbered step. Add 4-6 steps.',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'whoIsItFor',
      title: 'Who Is It For (Is This Right for Your Child?)',
      type: 'array',
      group: 'content',
      description: 'List who would benefit from this service. Each item appears as a bullet point. Add 4-6 items.',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'content',
      description: 'How long is each session? (e.g., "45-minute sessions, typically weekly")',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      group: 'content',
      description: 'How is the service delivered? (e.g., "In-person at our center" or "Online options available")',
    }),

    // ============================================
    // SEO GROUP
    // ============================================
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      group: 'seo',
      description: 'Optional: Customize how this page appears in search results.',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Custom title for search engines (50-60 characters). Leave blank to use service title.',
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 2,
          description: 'Custom description for search engines (150-160 characters). Leave blank to use short description.',
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Custom image when shared on social media. Leave blank to use service image.',
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