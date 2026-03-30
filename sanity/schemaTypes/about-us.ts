import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";

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
      description: "The top section of the About Us page with title, description, and images",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Main Title",
          type: "string",
          description: "Current: 'Empowering Every Neurodivergent Child to Thrive'. Leave blank to keep default.",
        }),
        defineField({
          name: "italicSubtitle",
          title: "📝 [EDIT] Italic Highlight (Optional)",
          type: "string",
          description: "Text shown in purple italic after the title. e.g., 'with Care & Expertise'",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Description",
          type: "text",
          rows: 3,
          description: "Current: 'We provide expert assessments, therapy, and family support...'. Leave blank to keep default.",
        }),
        defineField({
          name: "images",
          title: "🖼️ [EDIT] Hero Images (3 images)",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                  description: "Describe what's in the image for accessibility",
                },
              ],
              components: {
                input: ImageWithPreview,
              },
            },
          ],
          description: "📐 Upload 3 images: 1st = large (1200×675px, 16:9), 2nd & 3rd = square (600×600px). Click image → Edit → drag hotspot to faces!",
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
      description: "Shows 6 cards with reasons why families choose Divit MindSpace",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Section Title",
          type: "string",
          description: "Current: 'Why Families Choose Us'. Leave blank to keep default.",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Section Description",
          type: "text",
          rows: 2,
          description: "Current: 'What sets Divit MindSpace apart from other centers'. Leave blank to keep default.",
        }),
        defineField({
          name: "points",
          title: "📝 [EDIT] Key Points (6 cards)",
          type: "array",
          description: "Add 6 key differentiators. Default: Expert-Led Care, Child-First Approach, Family Involvement, Safe & Nurturing, Holistic Development, Early Intervention Focus",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Point Title",
                  type: "string",
                  description: "e.g., 'Expert-Led Care'",
                },
                {
                  name: "description",
                  title: "Point Description",
                  type: "text",
                  rows: 2,
                  description: "1-2 sentences explaining this point",
                },
                {
                  name: "icon",
                  title: "🔧 [OPTIONAL] Icon Name",
                  type: "string",
                  description: "Lucide icon: Heart, Brain, Users, Shield, Sparkles, Clock",
                },
              ],
              preview: {
                select: { title: "title", subtitle: "description" },
              },
            },
          ],
          validation: (rule) => rule.max(6),
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
      description: "Tell the Divit MindSpace story with image on left, text on right",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Story Title",
          type: "string",
          description: "Current: 'Our Story'. Leave blank to keep default.",
        }),
        defineField({
          name: "paragraphs",
          title: "📝 [EDIT] Story Content",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          description: "Add 2-4 paragraphs. Current default tells the founder's journey and mission.",
        }),
        defineField({
          name: "image",
          title: "🖼️ [EDIT] Story Image",
          type: "image",
          options: { hotspot: true },
          description: "📐 RECOMMENDED: 800×600px (4:3 ratio). Shows alongside the story text. Click image → Edit → drag hotspot to faces!",
          components: {
            input: ImageWithPreview,
          },
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
