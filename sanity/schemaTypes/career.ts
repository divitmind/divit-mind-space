import { defineField, defineType, defineArrayMember } from 'sanity'

export const careerType = defineType({
  name: 'career',
  title: 'Careers',
  type: 'document',
  groups: [
    { name: 'basic', title: '1. Job Info', default: true },
    { name: 'details', title: '2. Job Details' },
    { name: 'settings', title: '3. Settings' },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Job listing essentials
    // ============================================================
    defineField({
      name: 'title',
      type: 'string',
      title: '📝 [EDIT] Job Title',
      group: 'basic',
      description: 'e.g., Clinical Psychologist, Speech Therapist',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: '🔗 [AUTO] URL Slug',
      group: 'basic',
      description: "Auto-generated from title. Click 'Generate'.",
      options: {
        source: 'title',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      type: 'string',
      title: '📝 [EDIT] Department',
      group: 'basic',
      description: 'e.g., Clinical Services, Education & Training',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'employmentType',
      type: 'string',
      title: '📂 [SELECT] Employment Type',
      group: 'basic',
      options: {
        list: [
          {title: 'Full time', value: 'full-time'},
          {title: 'Internship', value: 'internship'},
          {title: 'Contract', value: 'contract'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationType',
      type: 'string',
      title: '📂 [SELECT] Work Mode',
      group: 'basic',
      options: {
        list: [
          {title: 'Remote', value: 'remote'},
          {title: 'Onsite', value: 'onsite'},
          {title: 'Hybrid', value: 'hybrid'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'array',
      title: '📍 [SELECT] Locations',
      group: 'basic',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Bangalore', value: 'bangalore'},
          {title: 'Mumbai', value: 'mumbai'},
          {title: 'Delhi', value: 'delhi'},
          {title: 'Hyderabad', value: 'hyderabad'},
          {title: 'Chennai', value: 'chennai'},
          {title: 'Remote - India', value: 'remote-india'},
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'salaryRange',
      type: 'object',
      title: '💰 [OPTIONAL] Salary Range',
      group: 'basic',
      fields: [
        { name: 'min', type: 'string', title: 'Minimum', description: 'e.g., ₹30K' },
        { name: 'max', type: 'string', title: 'Maximum', description: 'e.g., ₹50K' },
        { name: 'note', type: 'string', title: 'Note', description: 'e.g., + Benefits' },
      ],
    }),

    // ============================================================
    // JOB DETAILS - Full job description
    // ============================================================
    defineField({
      name: 'aboutRole',
      type: 'array',
      title: '📝 [EDIT] About This Role',
      group: 'details',
      description: 'Describe the role, responsibilities, and what makes it exciting',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'requirements',
      type: 'array',
      title: '📝 [EDIT] Requirements',
      group: 'details',
      of: [{type: 'string'}],
      description: 'Add each requirement as a separate item',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'skills',
      type: 'array',
      title: '📝 [EDIT] Skills & Qualifications',
      group: 'details',
      of: [{type: 'string'}],
      description: 'Add each skill/qualification as a separate item',
      validation: (rule) => rule.required().min(1),
    }),

    // ============================================================
    // SETTINGS - Publishing options
    // ============================================================
    defineField({
      name: 'postedDate',
      type: 'datetime',
      title: '📅 [EDIT] Posted Date',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: '✅ [TOGGLE] Active Position',
      group: 'settings',
      description: 'Turn off to hide from careers page',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      employmentType: 'employmentType',
      isActive: 'isActive',
    },
    prepare({ title, department, employmentType, isActive }) {
      return {
        title: isActive ? title : `🚫 ${title}`,
        subtitle: `${department} • ${employmentType}`,
      }
    },
  },
})
