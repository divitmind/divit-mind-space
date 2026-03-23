import { defineArrayMember, defineField, defineType } from "sanity";

export const specialistType = defineType({
  name: "specialist",
  title: "Specialists / Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job Title / Role",
      type: "string",
      description: "e.g., Clinical Psychologist, Occupational Therapist",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "experience",
      title: "Years of Experience",
      type: "string",
      description: "e.g., 20+ years, 8 years",
    }),
    defineField({
      name: "specialties",
      title: "Specialties / Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Add up to 4 key specialties (e.g., Autism, ADHD, Motor Skills)",
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "teaser",
      title: "Short Teaser",
      type: "text",
      rows: 2,
      description: "A one-sentence 'What I do' hook for the card preview",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "fullBio",
      title: "Full Biography",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        }),
      ],
      description: "The full professional story that appears in the 'Read More' popup",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Higher numbers appear first (e.g., 100 for founders, 10 for specialists)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});
