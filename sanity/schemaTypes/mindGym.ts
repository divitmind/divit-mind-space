import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";
import { Brain, Layout, GraduationCap, Sparkles, Microscope, Settings2 } from "lucide-react";

export const mindGymType = defineType({
  name: "mindGym",
  title: "Mind Gym Games",
  type: "document",
  icon: Brain,
  groups: [
    { name: "basic", title: "1. Basic Info", icon: Settings2 },
    { name: "display", title: "2. Landing Card", icon: Layout },
    { name: "content", title: "3. Science & Tips", icon: Microscope },
  ],
  fields: [
    // --- BASIC INFO GROUP ---
    defineField({
      name: "title",
      title: "Game Title",
      type: "string",
      description: "Enter the full name of the exercise (e.g., 'Neural Fusion').",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Click 'Generate' to create the URL path based on the title.",
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
      description: "Controls which filter this game appears under on the landing page.",
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
      title: "Game Cover Image",
      type: "image",
      description: "The main visual for the landing page card. (Recommended: 16:9 Landscape)",
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
      description: "e.g., 'All Ages' or 'Teens & Adults'.",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "focusArea",
      title: "Cognitive Focus Area",
      type: "string",
      description: "The specific skill being trained (e.g., 'Processing Speed').",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description: "A 2-line summary shown on the landing page card.",
      group: "display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "benefit",
      title: "The Core Benefit",
      type: "text",
      rows: 2,
      description: "A powerful one-sentence scientific value-add.",
      group: "display",
    }),

    // --- EDUCATIONAL CONTENT GROUP ---
    defineField({
      name: "scienceBehindIt",
      title: "The Science Behind It",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed scientific explanation shown in the game's info modal.",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quickTips",
      title: "Quick Tips for Flow",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points to help the user master the exercise.",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "coverImage",
    },
    prepare({ title, category, media }) {
      const categoryMap: any = {
        focus: "🎯 Focus",
        memory: "🧠 Memory",
        spatial: "🧭 Spatial",
        flexibility: "⚡ Flexibility"
      };
      return {
        title,
        subtitle: categoryMap[category] || "Brain Exercise",
        media,
      };
    },
  },
});
