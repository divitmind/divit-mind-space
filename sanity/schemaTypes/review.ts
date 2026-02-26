import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Reviewer name (e.g. Priya M., Rahul & Sneha K.)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "E.g. Parent of 8-year-old with ADHD",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      description: "Review text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Star rating 1–5",
      validation: (rule) => rule.min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Used for ordering; most recent first",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Prioritize on homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "quote",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? (subtitle as string).slice(0, 60) + "…" : undefined,
      };
    },
  },
});
