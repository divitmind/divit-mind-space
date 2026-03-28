import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Reviews / Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "📝 [EDIT] Reviewer Name",
      type: "string",
      description: "e.g., Priya M., Rahul & Sneha K.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "📝 [EDIT] Reviewer Context",
      type: "string",
      description: "e.g., Parent of 8-year-old with ADHD",
    }),
    defineField({
      name: "quote",
      title: "📝 [EDIT] Review Text",
      type: "text",
      rows: 4,
      description: "The testimonial/review content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "⭐ [SELECT] Star Rating",
      type: "number",
      description: "1 to 5 stars",
      options: {
        list: [
          { title: "⭐⭐⭐⭐⭐ (5)", value: 5 },
          { title: "⭐⭐⭐⭐ (4)", value: 4 },
          { title: "⭐⭐⭐ (3)", value: 3 },
          { title: "⭐⭐ (2)", value: 2 },
          { title: "⭐ (1)", value: 1 },
        ],
      },
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "publishedAt",
      title: "📅 [EDIT] Date Received",
      type: "datetime",
      description: "When this review was received (for ordering)",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "⭐ [TOGGLE] Featured Review",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "quote",
      rating: "rating",
      featured: "featured",
    },
    prepare({ title, subtitle, rating, featured }) {
      const stars = "⭐".repeat(rating || 5);
      return {
        title: featured ? `⭐ ${title}` : title || "Untitled",
        subtitle: `${stars} - ${subtitle ? (subtitle as string).slice(0, 50) + "…" : "No quote"}`,
      };
    },
  },
});
