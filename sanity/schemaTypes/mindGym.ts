import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";

export const mindGymType = defineType({
  name: "mindGym",
  title: "Mind Gym Games",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Game Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g., 'focus', 'memory', 'spatial', 'flexibility'",
      options: {
        list: [
          { title: "Focus & Attention", value: "focus" },
          { title: "Working Memory", value: "memory" },
          { title: "Spatial Logic", value: "spatial" },
          { title: "Cognitive Flexibility", value: "flexibility" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      components: {
        input: ImageWithPreview,
      },
    }),
    defineField({
      name: "ageGroup",
      title: "Target Age Group",
      type: "string",
      description: "e.g., 'Kids 8+', 'Teens', 'Adults'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "focusArea",
      title: "Cognitive Focus Area",
      type: "string",
      description: "e.g., 'Working Memory', 'Visual Scanning', 'Cognitive Flexibility'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief summary shown on the landing page cards",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "benefit",
      title: "Specific Benefit",
      type: "text",
      rows: 2,
      description: "A one-sentence scientific benefit for the landing card",
    }),
    defineField({
      name: "scienceBehindIt",
      title: "The Science Behind It",
      type: "array",
      of: [{ type: "block" }],
      description: "Educational content explaining how this game helps the brain",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quickTips",
      title: "Quick Tips",
      type: "array",
      of: [{ type: "string" }],
      description: "Bulleted tips for the game sidebar",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "focusArea",
      media: "coverImage",
    },
  },
});
