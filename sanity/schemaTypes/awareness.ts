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
      title: "🚀 [EDIT] Hero Section",
      type: "object",
      group: "hero",
      description: "Main intro section of the Awareness Page",
      fields: [
        defineField({
          name: "badge",
          title: "🏷️ Badge Text",
          type: "string",
          description: "e.g., '100% Free Sessions'",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "title",
          title: "📝 Main Title",
          type: "string",
          description: "Main headline (e.g., 'Awareness Programs for Schools')",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "📄 Description",
          type: "text",
          rows: 3,
          description: "Subtitle paragraph below the headline",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "stats",
          title: "📊 Quick Stats",
          type: "array",
          description: "Stats shown below the description (e.g., '10+ Sessions Done')",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
            },
          ],
        }),
        defineField({
          name: "image",
          title: "🖼️ Hero Image",
          type: "image",
          options: { hotspot: true },
          description: "📐 RECOMMENDED: 800×600px (4:3 ratio). Main image on the right side.",
          components: {
            input: ImageWithPreview,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        }),
      ],
    }),

    // ============================================================
    // BENEFITS SECTION
    // ============================================================
    defineField({
      name: "benefits",
      title: "💎 [EDIT] Benefits Section",
      type: "object",
      group: "benefits",
      description: "Explains what the community/school gets from these sessions",
      fields: [
        defineField({
          name: "title",
          title: "📝 Section Title",
          type: "string",
          description: "e.g., 'What Your School Gets'",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "📝 Section Subtitle",
          type: "string",
          description: "Brief intro text",
        }),
        defineField({
          name: "items",
          title: "✅ Benefit Items",
          type: "array",
          description: "Exactly 4 benefit cards are recommended",
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
                  description: "Lucide icon (GraduationCap, Users, Heart, School)",
                },
              ],
            },
          ],
          validation: (rule) => rule.required().min(1).max(4),
        }),
      ],
    }),

    // ============================================================
    // HIGHLIGHTS SECTION
    // ============================================================
    defineField({
      name: "highlights",
      title: "📋 [EDIT] What We Cover",
      type: "object",
      group: "highlights",
      description: "List of topics covered in the sessions",
      fields: [
        defineField({
          name: "title",
          title: "📝 Section Title",
          type: "string",
          description: "e.g., 'What We Cover'",
        }),
        defineField({
          name: "description",
          title: "📄 Section Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "items",
          title: "✨ Highlight Items",
          type: "array",
          of: [{ type: "string" }],
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
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        }),
      ],
    }),

    // ============================================================
    // PAST SESSIONS SECTION
    // ============================================================
    defineField({
      name: "pastSessions",
      title: "📸 [EDIT] Past Sessions Gallery",
      type: "object",
      group: "pastSessions",
      description: "Showcase photos of previous sessions",
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
          title: "🖼️ Sessions List",
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
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt Text",
                    },
                  ],
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
      title: "🔗 [EDIT] CTA Section",
      type: "object",
      group: "cta",
      description: "Final call to action at the bottom",
      fields: [
        defineField({
          name: "title",
          title: "📝 CTA Title",
          type: "string",
          description: "e.g., 'Want to Host a Session?'",
        }),
        defineField({
          name: "description",
          title: "📄 CTA Description",
          type: "text",
          rows: 2,
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
