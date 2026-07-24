import { defineType, defineField } from 'sanity'

export const spaceRentalType = defineType({
  name: 'spaceRental',
  title: 'Space Rentals',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Listing Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomSize',
      title: 'Room Size / Dimensions',
      type: 'string',
      description: 'e.g., 310.8 sq ft (17.55 ft × 17.71 ft)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Aadedhwar Chambers, Kasavanahalli, Off Sarjapur Road, Bangalore',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Space Gallery (15 Images)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload photos of the room, reception, equipment, and building exterior.',
    }),
    defineField({
      name: 'description',
      title: 'Overview / Intro Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits & Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add key points (e.g., Fully Equipped, Shared Lounge, Utilities Included)',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone / WhatsApp', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'website', title: 'Website URL', type: 'string' }),
      ],
    }),
  ],
})
