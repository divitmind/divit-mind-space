import { defineField, defineType } from "sanity";

export const awarenessProgramType = defineType({
  name: "awarenessProgram",
  title: "Awareness Program Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "FREE Awareness Programs on Neurodivergent Early Intervention",
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 3,
      initialValue: "Breaking myths and building understanding. Free awareness sessions for teachers, parents, and communities about early intervention and neurodiversity support.",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "events",
      title: "Workshops & Events",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Event Name", type: "string" },
            { name: "location", title: "Location", type: "string" },
            { name: "date", title: "Date / Time Info", type: "string", description: "e.g., Every Saturday, 10 AM" },
            { name: "description", title: "Short Description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
  ],
});
