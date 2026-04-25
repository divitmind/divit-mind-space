import { defineField, defineType, defineArrayMember } from 'sanity'

export const careerType = defineType({
  name: 'career',
  title: 'Careers',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Job Title',
      description: 'e.g., Manager, Product Support - APAC',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
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
      name: 'department',
      type: 'string',
      title: 'Department',
      description: 'e.g., Customer Success, Education & Training, Clinical Services',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'array',
      title: 'Locations',
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
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type',
      options: {
        list: [
          {title: 'Full time', value: 'full-time'},
          {title: 'Internship', value: 'internship'},
          {title: 'Contract', value: 'contract'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationType',
      type: 'string',
      title: 'Location Type',
      options: {
        list: [
          {title: 'Remote', value: 'remote'},
          {title: 'Onsite', value: 'onsite'},
          {title: 'Hybrid', value: 'hybrid'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'salaryRange',
      type: 'object',
      title: 'Salary Range',
      fields: [
        {
          name: 'min',
          type: 'string',
          title: 'Minimum',
          description: 'e.g., ₹75K, $75K',
        },
        {
          name: 'max',
          type: 'string',
          title: 'Maximum',
          description: 'e.g., ₹85K, $85K',
        },
        {
          name: 'note',
          type: 'string',
          title: 'Additional Note',
          description: 'e.g., Offers Equity, Multiple Ranges',
        },
      ],
    }),
    defineField({
      name: 'aboutRole',
      type: 'array',
      title: 'About This Role',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      type: 'array',
      title: 'Key Responsibilities',
      of: [{type: 'string'}],
      description: 'Add each responsibility as a separate point',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      of: [{type: 'string'}],
      description: 'Add each requirement as a separate point',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'additionalAdvantage',
      type: 'array',
      title: 'Additional Advantage',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'whatWeOffer',
      type: 'array',
      title: 'What We Offer',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'skills',
      type: 'array',
      title: 'Skills and Qualifications',
      of: [{type: 'string'}],
      description: 'Add each skill/qualification as a separate point',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active Position',
      description: 'Toggle to show/hide this position on careers page',
      initialValue: true,
    }),
    defineField({
      name: 'postedDate',
      type: 'datetime',
      title: 'Posted Date',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
    ],
    preview: {
    select: {
      title: 'title',
      department: 'department',
      employmentType: 'employmentType',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, department, employmentType, isActive, order }) {
      return {
        title: `${order ? `[${order}] ` : ''}${title}`,
        subtitle: `${department} â€¢ ${employmentType} â€¢ ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
    },
    })
