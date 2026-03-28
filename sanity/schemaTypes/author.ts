import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Blog Authors",
  type: "document",
  groups: [
    { name: "basic", title: "1. Basic Info", default: true },
    { name: "contact", title: "2. Contact & Social" },
  ],
  fields: [
    // ============================================================
    // BASIC INFO - Author essentials
    // ============================================================
    defineField({
      name: "name",
      title: "📝 [EDIT] Author Name",
      type: "string",
      group: "basic",
      description: "Full name of the blog author",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "🔗 [AUTO] URL Slug",
      type: "slug",
      group: "basic",
      description: "Auto-generated from name. Click 'Generate'.",
      options: {
        source: "name",
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "🖼️ [EDIT] Profile Photo",
      type: "image",
      group: "basic",
      description: "Author's photo. Set hotspot on face!",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "📝 [EDIT] Short Bio",
      type: "array",
      group: "basic",
      description: "Brief author introduction (1-2 paragraphs)",
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
    }),

    // ============================================================
    // CONTACT & SOCIAL - Optional contact information
    // ============================================================
    defineField({
      name: "email",
      title: "📧 [OPTIONAL] Email",
      type: "string",
      group: "contact",
      description: "Contact email (not displayed publicly)",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "social",
      title: "🔗 [OPTIONAL] Social Media Links",
      type: "object",
      group: "contact",
      description: "Optional social media profiles",
      fields: [
        {
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        },
        {
          name: "github",
          title: "GitHub URL",
          type: "url",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
