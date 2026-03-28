import { defineArrayMember, defineField, defineType } from "sanity";

export const specialistType = defineType({
  name: "specialist",
  title: "Specialists / Team",
  type: "document",
  groups: [
    { name: "basic", title: "1. Basic Info", default: true },
    { name: "bio", title: "2. Biography" },
    { name: "settings", title: "3. Display Settings" },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Essential profile information
    // ============================================================
    defineField({
      name: "name",
      title: "📝 [EDIT] Full Name",
      type: "string",
      group: "basic",
      description: "Team member's full name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "🔗 [AUTO] URL Slug",
      type: "slug",
      group: "basic",
      description: "Auto-generated from name. Click 'Generate' after entering name.",
      options: {
        source: "name",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "📝 [EDIT] Job Title / Role",
      type: "string",
      group: "basic",
      description: "e.g., Clinical Psychologist, Occupational Therapist, Founder",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "🖼️ [EDIT] Profile Photo",
      type: "image",
      group: "basic",
      description: "Professional headshot. Set hotspot on face!",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "experience",
      title: "📝 [EDIT] Years of Experience",
      type: "string",
      group: "basic",
      description: "e.g., '20+ years', '8 years'",
    }),
    defineField({
      name: "specialties",
      title: "📝 [EDIT] Specialties / Tags",
      type: "array",
      group: "basic",
      of: [{ type: "string" }],
      description: "Up to 4 key specialties (e.g., Autism, ADHD, Motor Skills)",
      validation: (rule) => rule.max(4),
    }),

    // ============================================================
    // BIOGRAPHY - Detailed profile content
    // ============================================================
    defineField({
      name: "teaser",
      title: "📝 [EDIT] Short Teaser",
      type: "text",
      group: "bio",
      rows: 2,
      description: "One-sentence 'What I do' hook for the card preview (max 150 chars)",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "fullBio",
      title: "📝 [EDIT] Full Biography",
      type: "array",
      group: "bio",
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
      description: "Full professional story shown in the 'Read More' popup",
    }),

    // ============================================================
    // DISPLAY SETTINGS
    // ============================================================
    defineField({
      name: "order",
      title: "🔢 [SETTING] Display Order",
      type: "number",
      group: "settings",
      description: "Higher numbers appear first. Founders: 100, Senior: 50, Others: 10",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title,
        subtitle: `${subtitle} (Order: ${order || 0})`,
        media: media,
      };
    },
  },
});
