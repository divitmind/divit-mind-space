import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";

export const awarenessType = defineType({
  name: "awareness",
  title: "Awareness Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Section", default: true },
    { name: "benefits", title: "2. Benefits Section" },
    { name: "highlights", title: "3. What We Cover" },
    { name: "pastSessions", title: "4. Past Sessions" },
    { name: "cta", title: "5. CTA Section" },
  ],
  fields: [
    // ============================================================
    // HERO SECTION
    // ============================================================
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "badge",
          title: "🚀 Badge Text",
          type: "string",
          description: "e.g., '100% Free Sessions'",
        }),
        defineField({
          name: "title",
          title: "📝 Main Title",
          type: "string",
          description: "Main headline of the page",
        }),
        defineField({
          name: "description",
          title: "📝 Description",
          type: "text",
          rows: 3,
          description: "Subtitle paragraph below the headline",
        }),
        defineField({
          name: "stats",
          title: "📊 Quick Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string", description: "e.g., 'Sessions Done'" },
                { name: "value", title: "Value", type: "string", description: "e.g., '10+'" },
              ],
            },
          ],
          description: "Stats shown below the description",
        }),
        defineField({
          name: "image",
          title: "🖼️ Hero Image",
          type: "image",
          options: { hotspot: true },
          description: "Main image on the right side of hero",
          components: {
            input: ImageWithPreview,
          },
        }),
      ],
    }),

    // ============================================================
    // BENEFITS SECTION
    // ============================================================
    defineField({
      name: "benefits",
      title: "Benefits Section",
      type: "object",
      group: "benefits",
      fields: [
        defineField({
          name: "title",
          title: "📝 Section Title",
          type: "string",
          description: "e.g., 'What Your School Gets'",
        }),
        defineField({
          name: "subtitle",
          title: "📝 Section Subtitle",
          type: "string",
          description: "Brief intro text below the title",
        }),
        defineField({
          name: "items",
          title: "💎 Benefit Items (4 cards)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 2 },
                {
                  name: "icon",
                  title: "🔧 Icon Name",
                  type: "string",
                  description: "Lucide icon name (GraduationCap, Users, Heart, School)",
                },
              ],
            },
          ],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),

    // ============================================================
    // HIGHLIGHTS SECTION
    // ============================================================
    defineField({
      name: "highlights",
      title: "What We Cover Section",
      type: "object",
      group: "highlights",
      fields: [
        defineField({
          name: "title",
          title: "📝 Section Title",
          type: "string",
          description: "e.g., 'What We Cover'",
        }),
        defineField({
          name: "description",
          title: "📝 Section Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "items",
          title: "✅ Highlight Items",
          type: "array",
          of: [{ type: "string" }],
          description: "List of topics covered in the sessions",
        }),
        defineField({
          name: "image",
          title: "🖼️ Section Image",
          type: "image",
          options: { hotspot: true },
          description: "Image shown next to the highlights list",
          components: {
            input: ImageWithPreview,
          },
        }),
      ],
    }),

    // ============================================================
    // PAST SESSIONS SECTION
    // ============================================================
    defineField({
      name: "pastSessions",
      title: "Past Sessions Section",
      type: "object",
      group: "pastSessions",
      fields: [
        defineField({
          name: "title",
          title: "📝 Section Title",
          type: "string",
          description: "e.g., 'Sessions We\'ve Conducted'",
        }),
        defineField({
          name: "subtitle",
          title: "📝 Section Subtitle",
          type: "string",
        }),
        defineField({
          name: "sessions",
          title: "📸 Sessions Gallery",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "venue", title: "Venue Name", type: "string" },
                { name: "audience", title: "Audience Type", type: "string" },
                {
                  name: "image",
                  title: "Session Photo",
                  type: "image",
                  options: { hotspot: true },
                  components: {
                    input: ImageWithPreview,
                  },
                },
              ],
            },
          ],
        }),
      ],
    }),

    // ============================================================
    // CTA SECTION
    // ============================================================
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "title",
          title: "📝 CTA Title",
          type: "string",
          description: "e.g., 'Want to Host a Session?'",
        }),
        defineField({
          name: "description",
          title: "📝 CTA Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "buttonText",
          title: "🔘 Button Text",
          type: "string",
          description: "e.g., 'Request a Free Session'",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Awareness Page Content",
        subtitle: "Edit hero, benefits, highlights, past sessions & CTA",
      };
    },
  },
});
