import { defineField, defineType } from "sanity";

export const aboutUsType = defineType({
  name: "aboutUs",
  title: "About Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Section", default: true },
    { name: "philosophy", title: "2. Why Us Section" },
    { name: "story", title: "3. Our Story" },
  ],
  fields: [
    // ============================================================
    // HERO SECTION - Top of the About Us page
    // ============================================================
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Main Title",
          type: "string",
          description: "Main headline on the About Us page",
        }),
        defineField({
          name: "italicSubtitle",
          title: "📝 [EDIT] Italic Highlight",
          type: "string",
          description: "Text shown in purple italic after the title",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Description",
          type: "text",
          rows: 3,
          description: "Subtitle paragraph below the headline",
        }),
        defineField({
          name: "images",
          title: "🖼️ [EDIT] Hero Images",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
          description: "Upload 2-3 images. Set hotspot on faces!",
          validation: (rule) => rule.max(3),
        }),
      ],
    }),

    // ============================================================
    // PHILOSOPHY SECTION - Why Us / Our Approach
    // ============================================================
    defineField({
      name: "philosophy",
      title: "Why Us Section",
      type: "object",
      group: "philosophy",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Section Title",
          type: "string",
          description: "e.g., 'Why Choose Divit MindSpace?'",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Section Description",
          type: "text",
          rows: 3,
          description: "Brief intro paragraph for this section",
        }),
        defineField({
          name: "points",
          title: "📝 [EDIT] Key Points",
          type: "array",
          description: "3-4 key differentiators. Each needs title + description.",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Point Title", type: "string" },
                { name: "description", title: "Point Description", type: "text", rows: 2 },
                { name: "icon", title: "🔧 [OPTIONAL] Icon Name", type: "string", description: "Lucide icon name: Heart, Brain, Users, Star, etc." }
              ],
              preview: {
                select: { title: "title" },
              },
            }
          ],
        }),
      ],
    }),

    // ============================================================
    // STORY SECTION - Our Journey
    // ============================================================
    defineField({
      name: "story",
      title: "Our Story Section",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Story Title",
          type: "string",
          description: "e.g., 'Our Journey'",
        }),
        defineField({
          name: "paragraphs",
          title: "📝 [EDIT] Story Content",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          description: "Add multiple paragraphs to tell your story",
        }),
        defineField({
          name: "image",
          title: "🖼️ [EDIT] Story Image",
          type: "image",
          options: { hotspot: true },
          description: "Image shown alongside the story. Set hotspot!",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Us Page Content",
        subtitle: "Edit hero, philosophy & story sections",
      };
    },
  },
});
