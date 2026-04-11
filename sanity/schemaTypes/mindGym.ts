import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";
import { Brain, Layout, GraduationCap, Settings } from "lucide-react";

export const mindGymType = defineType({
  name: "mindGym",
  title: "Mind Gym Games",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "display", title: "Landing Page" },
    { name: "content", title: "Educational Content" },
    { name: "settings", title: "System Settings" },
  ],
  fields: [
    // --- BASIC INFO GROUP ---
    defineField({
      name: "title",
      title: "Game Title",
      type: "string",
      description: "The name of the exercise (e.g., 'Neural Fusion').",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Unique identifier for the URL. Click 'Generate' based on the title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Game Category",
      type: "string",
      description: "Used for the 'Choose Your Focus' filter on the landing page.",
      options: {
        list: [
          { title: "Focus & Attention", value: "focus" },
          { title: "Working Memory", value: "memory" },
          { title: "Spatial Logic", value: "spatial" },
          { title: "Cognitive Flexibility", value: "flexibility" },
        ],
      },
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),

    // --- LANDING PAGE GROUP ---
    defineField({
      name: "coverImage",
      title: "Card Image",
      type: "image",
      description: "The main visual for the game card. Recommended: 16:9 aspect ratio.",
      options: { hotspot: true },
      components: {
        input: ImageWithPreview,
      },
      group: "display",
    }),
    defineField({
      name: "ageGroup",
      title: "Target Age Group",
      type: "string",
      description: "Displayed on the card (e.g., 'All Ages', 'Teens & Adults').",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "focusArea",
      title: "Primary Focus Area",
      type: "string",
      description: "The specific cognitive skill (e.g., 'Processing Speed').",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Card Summary",
      type: "text",
      rows: 3,
      description: "A brief, catchy summary for the landing page card.",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "benefit",
      title: "One-Sentence Benefit",
      type: "text",
      rows: 2,
      description: "The scientific value-add (e.g., 'Enhances neural efficiency').",
      group: "display",
    }),

    // --- EDUCATIONAL CONTENT GROUP ---
    defineField({
      name: "scienceBehindIt",
      title: "The Science Behind It",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed explanation shown in the game's info panel (i).",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quickTips",
      title: "Quick Tips for Flow",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points to help the user achieve a 'flow state'.",
      group: "content",
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
