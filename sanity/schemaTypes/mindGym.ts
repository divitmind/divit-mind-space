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
      name: "scienceBehindIt",
      title: "The Science Behind It",
      type: "array",
      of: [{ type: "block" }],
      description: "Educational content explaining how this game helps the brain",
      validation: (Rule) => Rule.required(),
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
