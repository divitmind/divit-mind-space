import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutUsType = defineType({
  name: "aboutUs",
  title: "About Us Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "[REQUIRED] Main Title", type: "string" }),
        defineField({ name: "italicSubtitle", title: "Italicized Subtitle", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ 
          name: "images", 
          title: "Hero Images", 
          type: "array", 
          of: [{ type: "image", options: { hotspot: true } }],
          validation: (rule) => rule.max(2)
        }),
      ],
    }),
    // Philosophy Section (Why Us)
    defineField({
      name: "philosophy",
      title: "Philosophy Section (Why Us)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "[REQUIRED] Section Title", type: "string" }),
        defineField({ name: "description", title: "Section Description", type: "text", rows: 3 }),
        defineField({
          name: "points",
          title: "Key Philosophy Points",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Point Title", type: "string" },
                { name: "description", title: "Point Description", type: "text", rows: 2 },
                { name: "icon", title: "Icon Name (Lucide)", type: "string", description: "e.g., Heart, Brain, Users" }
              ]
            }
          ]
        })
      ],
    }),
    // Story Section
    defineField({
      name: "story",
      title: "Our Story Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "[REQUIRED] Story Title", type: "string" }),
        defineField({ 
          name: "paragraphs", 
          title: "Story Paragraphs", 
          type: "array", 
          of: [{ type: "text", rows: 3 }] 
        }),
        defineField({ name: "image", title: "Story Image", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Us Page Content",
      };
    },
  },
});
