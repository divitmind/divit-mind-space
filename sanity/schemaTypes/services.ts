import {defineArrayMember, defineField, defineType} from 'sanity'
import { ImageWithPreview } from '../components/ImageWithPreview'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'basic', title: '1. Basic Info', default: true },
    { name: 'content', title: '2. Service Details' },
    { name: 'seo', title: '3. SEO (Optional)' },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Required fields for service listing
    // ============================================================
    defineField({
      name: 'title',
      title: '📝 [EDIT] Service Title',
      type: 'string',
      group: 'basic',
      description: 'The main title shown on cards and page headers',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '🔗 [AUTO] URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'Auto-generated from title. Click "Generate" after entering title.',
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
      title: '📂 [REQUIRED] Category',
      group: 'basic',
      description: 'Determines where this service appears on the website',
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
      title: '📝 [EDIT] Card Description',
      group: 'basic',
      rows: 3,
      description: 'Short summary shown on service cards (max 200 characters)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: '🖼️ [OPTIONAL] Service Image',
      type: 'image',
      group: 'basic',
      description: '📐 RECOMMENDED: 800×600px (4:3 ratio) or larger. Use hotspot on faces/key areas so cropping looks good.',
      options: {hotspot: true},
      components: {
        input: ImageWithPreview,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (for accessibility)',
        },
      ],
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      title: '⭐ [TOGGLE] Featured Service',
      group: 'basic',
      description: 'Enable to show this service at the top of listings',
      initialValue: false,
    }),
    defineField({
      name: 'isTherapy',
      type: 'boolean',
      title: '💜 [TOGGLE] Therapy Badge',
      group: 'basic',
      description: 'Enable to show the therapy badge on this service',
      initialValue: false,
    }),

    // ============================================================
    // SERVICE DETAILS - Content shown on service detail page
    // ============================================================
    defineField({
      name: 'duration',
      title: '⏱️ [EDIT] Duration',
      type: 'string',
      group: 'content',
      description: 'e.g., "45-minute sessions", "2-hour workshop", "6-week program"',
    }),
    defineField({
      name: 'format',
      title: '📍 [EDIT] Format / Location',
      type: 'string',
      group: 'content',
      description: 'e.g., "In-person at our center", "Online sessions available"',
    }),
    defineField({
      name: 'overview',
      title: '📝 [EDIT] Overview',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'Detailed description shown at the top of the service page (min 50 characters)',
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: 'benefits',
      title: '✅ [EDIT] Benefits (What You\'ll Gain)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List 4-6 key benefits. Each item appears as a bullet point.',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'whatToExpect',
      title: '📋 [EDIT] What to Expect',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'List the process steps. Each item appears as a numbered step.',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'whoIsItFor',
      title: '👨‍👩‍👧 [EDIT] Who Is It For',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Describe who benefits from this service. Each item appears as a bullet.',
      validation: (rule) => rule.required().min(3).max(8),
    }),
    defineField({
      name: 'body',
      title: '📄 [OPTIONAL] Additional Content',
      type: 'array',
      group: 'content',
      description: 'Rich text content for detailed information (FAQs, extra details, etc.)',
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
      title: '🔍 SEO Settings',
      group: 'seo',
      description: 'Leave blank to use auto-generated SEO from title and description',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: '✨ [AUTO] Meta Title',
          description: 'Leave blank to use service title. Custom: 50-60 characters.',
        },
        {
          name: 'metaDescription',
          type: 'string',
          title: '✨ [AUTO] Meta Description',
          description: 'Leave blank to use card description. Custom: 150-160 characters.',
        },
        {
          name: 'ogImage',
          type: 'image',
          title: '🖼️ [OPTIONAL] Social Share Image',
          description: 'Custom image for Facebook/Twitter sharing. Falls back to service image.',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      popular: 'popular',
      isTherapy: 'isTherapy',
      media: 'image',
    },
    prepare({ title, category, popular, isTherapy, media }) {
      const badges = [];
      if (popular) badges.push('⭐');
      if (isTherapy) badges.push('💜');
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'No category';

      return {
        title: `${badges.join(' ')} ${title}`.trim(),
        subtitle: categoryLabel,
        media: media,
      }
    },
  },
})