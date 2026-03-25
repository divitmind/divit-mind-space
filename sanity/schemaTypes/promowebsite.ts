import {defineField, defineType} from 'sanity'

export const promowebsiteType = defineType({
  name: 'promowebsite',
  title: 'Promo Website',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
      description: "Keep it short (suggested: 40-70 characters). This will appear at the top of the Home page. Example: '☀️ Summer Explorers Camp Registration Open'",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
